import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { FilesService } from 'src/modules/files/files.service';
import { CreateOwnerDto, CreatePetDto, UpdateOwnerDto } from '../dtos';
import { PaginationParamsDto } from 'src/modules/common';
import { Owners, Pets } from '../entities';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pets) private petRepository: Repository<Pets>,
    @InjectRepository(Owners) private ownerRepository: Repository<Owners>,
    private fileService: FilesService,
  ) {}

  async createOwner(ownerDto: CreateOwnerDto) {
    try {
      const { pets, ...props } = ownerDto;
      const newOnwner = this.ownerRepository.create({
        ...props,
        pets: pets.map((pet) => this.petRepository.create(pet)),
      });
      const createdPet = await this.ownerRepository.save(newOnwner);
      return this._plainOwner(createdPet);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
  async updateOwner(id: string, ownerDto: UpdateOwnerDto) {
    try {
      const { pets, ...props } = ownerDto;
      const ownderDb = await this.ownerRepository.findOne({
        where: { id },
        relations: { pets: true },
      });
      if (!ownderDb) throw new BadRequestException(`Owner ${id} dont't exist`);
      let imagesToDelete: string[] = [];
      const newModel = this.ownerRepository.create({
        id: ownderDb.id,
        pets: [
          // Update current pets if new dto containd pet id
          ...ownderDb.pets.map((pet) => {
            const newPet = ownerDto.pets.find(({ id }) => pet.id === id);
            if (!newPet) return pet;
            // Remove unused image
            if (newPet.image !== undefined && pet.image && pet.image !== newPet.image) {
              imagesToDelete.push(pet.image);
            }
            return this.petRepository.create({ ...pet, ...newPet });
          }),
          // Create new pet if not exist in array db
          ...pets
            .filter((pet) => !ownderDb.pets.some(({ id }) => id === pet.id))
            .map((pet) => this.petRepository.create(pet)),
        ],
        ...props,
      });
      const updatedOwner = await this.ownerRepository.save(newModel);
      this.fileService.deleteFiles(imagesToDelete);
      return this._plainOwner(updatedOwner);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async createPet(petDto: CreatePetDto) {
    try {
      const { ownderId, ...props } = petDto;
      const owner = await this.ownerRepository.preload({ id: ownderId });
      if (!owner) {
        throw new BadRequestException('El propietario no existe');
      }
      const newPet = this.petRepository.create({ ...props, owner });
      const createdPet = await this.petRepository.save(newPet);
      return createdPet;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async findPets({ limit, offset, term }: PaginationParamsDto) {
    const [pets, length] = await this.petRepository.findAndCount({
      take: limit,
      skip: offset,
      relations: { owner: true },
      ...(term && { where: { owner: { dni: ILike(`%${term}%`) } } }),
      order: {
        createdAt: 'DESC',
      },
    });
    return { pets, length };
  }

  async findOwnders({ limit, offset, term }: PaginationParamsDto) {
    const query = this.ownerRepository
      .createQueryBuilder('owner')
      .leftJoinAndSelect('owner.pets', 'pets')
      .take(limit)
      .skip(offset)
      .orderBy('owner.createdAt', 'DESC');
    if (term) {
      query.where(`CONCAT(owner.first_name, ' ', owner.middle_name, ' ', COALESCE(owner.last_name, '')) ILIKE :term `, {
        term: `%${term}%`,
      });
    }
    const [owners, length] = await query.getManyAndCount();
    return { owners: owners.map((owner) => this._plainOwner(owner)), length };
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
}
