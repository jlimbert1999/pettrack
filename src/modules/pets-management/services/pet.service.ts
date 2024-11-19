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

  async findAll({ limit, offset, term }: PaginationParamsDto) {
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
}
