import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginationParamsDto } from 'src/modules/common';
import { CreateTypeTreatmentDto, UpdateTypeTreatmentDto } from '../dtos';
import { TypesTreatments } from '../entities';

@Injectable()
export class TypeTreatmentService {
  constructor(
    @InjectRepository(TypesTreatments)
    private vaccineTypeRepository: Repository<TypesTreatments>,
  ) {}

  async findAll({ limit, offset }: PaginationParamsDto) {
    const [treatments, length] = await this.vaccineTypeRepository.findAndCount({
      take: limit,
      skip: offset,
    });
    return { treatments, length };
  }

  async create(treatmentDto: CreateTypeTreatmentDto) {
    const newTypeTreatment = this.vaccineTypeRepository.create(treatmentDto);
    return await this.vaccineTypeRepository.save(newTypeTreatment);
  }

  async update(id: number, treatmentDto: UpdateTypeTreatmentDto) {
    const typeTreatment = await this.vaccineTypeRepository.preload({
      id,
      ...treatmentDto,
    });
    if (!typeTreatment) {
      throw new BadRequestException(`Selected element don't exist`);
    }
    return await this.vaccineTypeRepository.save(typeTreatment);
  }
}
