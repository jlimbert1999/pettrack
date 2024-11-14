import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { PaginationParamsDto } from 'src/common';
import { CreateOwnerDto, CreatePetDto } from '../dtos';
import { Owners, Pets } from '../entities';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pets) private petRepository: Repository<Pets>,
    @InjectRepository(Owners) private ownerRepository: Repository<Owners>,
  ) {}

  async createOwner(ownerDto: CreateOwnerDto) {
    try {
      const { pets, ...props } = ownerDto;
      const newOnwner = this.ownerRepository.create({
        ...props,
        pets: pets.map((pet) => this.petRepository.create(pet)),
      });
      const createdPet = await this.ownerRepository.save(newOnwner);
      return createdPet;
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
      query.where(
        `CONCAT(owner.first_name, ' ', owner.middle_name, ' ', owner.last_name) ILIKE :term `,
        { term: `%${term}%` },
      );
    }
    const [owners, length] = await query.getManyAndCount();
    return { owners, length };
  }
}
