import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, ILike, Repository } from 'typeorm';

import { FilesService } from 'src/modules/files/files.service';
import { CreateOwnerDto, CreatePetDto, UpdateOwnerDto } from '../dtos';
import { PaginationParamsDto } from 'src/modules/common';
import { Owners, Pets } from '../entities';
import { Breeds } from 'src/modules/administration/entities';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pets) private petRepository: Repository<Pets>,
    @InjectRepository(Owners) private ownerRepository: Repository<Owners>,
    @InjectRepository(Breeds) private breedRepository: Repository<Breeds>,
    private fileService: FilesService,
  ) {}

  async create(petDto: CreatePetDto) {
    try {
      const { ownderId, breedId, ...props } = petDto;
      const [owner, breed] = await Promise.all([
        this.ownerRepository.preload({ id: ownderId }),
        this.breedRepository.preload({ id: breedId }),
      ]);
      if (!owner || !breed) {
        throw new BadRequestException('Datos incorrecto: Propietario / Raza');
      }
      const newPet = this.petRepository.create({ ...props, owner, breed });
      const createdPet = await this.petRepository.save(newPet);
      return createdPet;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll({ limit, offset, term }: PaginationParamsDto) {
    const query = this.petRepository
      .createQueryBuilder('pet')
      .leftJoinAndSelect('pet.owner', 'owner')
      .take(limit)
      .skip(offset)
      .orderBy('pet.createdAt', 'DESC');

    if (term) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('owner.dni ILIKE :term', { term: `%${term}%` })
            .orWhere('pet.code = :code', { code: !isNaN(Number(term)) ? Number(term) : null })
            .orWhere(
              `CONCAT(owner.first_name, ' ', owner.middle_name, ' ', COALESCE(owner.last_name, '')) ILIKE :term`,
              { term: `%${term}%` },
            );
        }),
      );
    }
    const [pets, length] = await query.getManyAndCount();
    return { pets, length };
  }

  async getDetail(id: string) {
    const pet = await this.petRepository.findOne({ where: { id }, relations: { owner: true } });
    if (!pet) throw new BadRequestException(`Pet ${id} don't exist`);
    return this._plainPet(pet);
  }

  private _plainPet(pet: Pets) {
    const { image, ...props } = pet;
    return {
      image: image ? this.fileService.buildFileUrl(image, 'pets') : null,
      ...props,
    };
  }
}
