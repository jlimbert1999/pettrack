import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Breeds } from '../entities';
import { PaginationParamsDto } from 'src/modules/common';
import { CreateBreedDto, UpdateBreedDto } from '../dtos';

@Injectable()
export class BreedService {
  constructor(
    @InjectRepository(Breeds)
    private breedRepository: Repository<Breeds>,
  ) {}

  async findAll({ limit, offset }: PaginationParamsDto) {
    const [breeds, length] = await this.breedRepository.findAndCount({
      take: limit,
      skip: offset,
    });
    return { breeds, length };
  }

  async create(breedDto: CreateBreedDto) {
    const newMedicalCenter = this.breedRepository.create(breedDto);
    return await this.breedRepository.save(newMedicalCenter);
  }

  async update(id: number, breedDto: UpdateBreedDto) {
    const medicalCenterDB = await this.breedRepository.preload({
      id,
      ...breedDto,
    });
    if (!medicalCenterDB) {
      throw new BadRequestException(`Selected element don't exist`);
    }
    return await this.breedRepository.save(medicalCenterDB);
  }
}
