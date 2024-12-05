import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FilesService } from 'src/modules/files/files.service';
import { Breeds, Districts } from 'src/modules/administration/entities';
import { PaginationParamsDto } from 'src/modules/common';
import { CreateOwnerDto, PetDto, UpdateOwnerDto } from '../dtos';
import { Pets, Owners } from '../entities';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Pets) private petRepository: Repository<Pets>,
    @InjectRepository(Owners) private ownerRepository: Repository<Owners>,
    @InjectRepository(Breeds) private breedRepository: Repository<Breeds>,
    @InjectRepository(Districts) private districtRepository: Repository<Districts>,
    private fileService: FilesService,
  ) {}

  async findAll({ limit, offset, term }: PaginationParamsDto) {
    const query = this.ownerRepository
      .createQueryBuilder('owner')
      .leftJoinAndSelect('owner.pets', 'pets')
      .leftJoinAndSelect('pets.breed', 'breed')
      .leftJoinAndSelect('owner.district', 'district')
      .take(limit)
      .skip(offset)
      .orderBy('owner.createdAt', 'DESC');
    if (term) {
      query
        .where(`CONCAT(owner.first_name, ' ', owner.middle_name, ' ', COALESCE(owner.last_name, '')) ILIKE :name`, {
          name: `%${term}%`,
        })
        .orWhere('owner.dni ILIKE :dni', { dni: `%${term}%` });
    }
    const [owners, length] = await query.getManyAndCount();
    return { owners: owners.map((owner) => this._plainOwner(owner)), length };
  }

  async create(ownerDto: CreateOwnerDto) {
    await this._checkDuplicateDni(ownerDto.dni);
    const { pets, districtId, ...props } = ownerDto;
    const newOnwner = this.ownerRepository.create({
      district: await this.districtRepository.preload({ id: districtId }),
      pets: await this._createPetModels(pets),
      ...props,
    });
    const createdPet = await this.ownerRepository.save(newOnwner);
    return this._plainOwner(createdPet);
  }

  async update(id: string, ownerDto: UpdateOwnerDto) {
    const { pets, districtId, ...props } = ownerDto;
    const ownderDb = await this.ownerRepository.findOne({
      where: { id },
      relations: { pets: true },
    });
    if (!ownderDb) throw new BadRequestException(`Owner ${id} dont't exist`);
    let imagesToDelete: string[] = [];
    const newModel = this.ownerRepository.create({
      id: ownderDb.id,
      district: await this.districtRepository.preload({ id: districtId }),
      ...props,
      pets: [
        // Update current pets if new dto containd pet id
        ...ownderDb.pets.map((pet) => {
          const updatedPet = ownerDto.pets.find(({ id }) => pet.id === id);
          if (!updatedPet) return pet;
          // Remove unused image
          if (updatedPet.image !== undefined && pet.image && pet.image !== updatedPet.image) {
            imagesToDelete.push(pet.image);
          }
          return this.petRepository.create({
            ...pet,
            ...updatedPet,
            breed: this.breedRepository.create({ id: updatedPet.breedId }),
          });
        }),
        // Create new pet if not exist in array db
        ...pets
          .filter((pet) => !ownderDb.pets.some(({ id }) => id === pet.id))
          .map(({ breedId, ...petProps }) =>
            this.petRepository.create({
              ...petProps,
              breed: this.breedRepository.create({ id: breedId }),
            }),
          ),
      ],
    });
    const updatedOwner = await this.ownerRepository.save(newModel);
    this.fileService.deleteFiles(imagesToDelete);
    return this._plainOwner(updatedOwner);
  }

  async getDistricts() {
    return this.districtRepository.find({});
  }

  private _plainOwner(owner: Owners) {
    const { pets, ...props } = owner;
    return {
      pets: pets.map(({ image, ...petProps }) => ({
        ...petProps,
        image: image ? this.fileService.buildFileUrl(image, 'pets') : null,
      })),
      ...props,
    };
  }

  private async _createPetModels(pets: PetDto[]) {
    return await Promise.all(
      pets.map(async (pet) => {
        const breed = await this.breedRepository.preload({ id: pet.breedId });
        return this.petRepository.create({ ...pet, breed });
      }),
    );
  }

  private async _checkDuplicateDni(dni: string): Promise<void> {
    const duplicate = await this.ownerRepository.findOne({ where: { dni } });
    if (duplicate) {
      throw new BadRequestException(`El CI: ${dni} ya existe`);
    }
  }
}
