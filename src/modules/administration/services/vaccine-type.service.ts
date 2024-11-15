import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginationParamsDto } from 'src/modules/common';
import { VaccineTypes } from '../entities';
import {
  CreateVaccineTypeDto,
  UpdateVaccineTypeDto,
} from '../dtos/vaccine-type.dto';

@Injectable()
export class VaccineTypeService {
  constructor(
    @InjectRepository(VaccineTypes)
    private vaccineTypeRepository: Repository<VaccineTypes>,
  ) {}

  async findAll({ limit, offset }: PaginationParamsDto) {
    const [vaccineTypes, length] =
      await this.vaccineTypeRepository.findAndCount({
        take: limit,
        skip: offset,
      });
    return { vaccineTypes, length };
  }

  async create(vaccineDto: CreateVaccineTypeDto) {
    const newVaccine = this.vaccineTypeRepository.create(vaccineDto);
    return await this.vaccineTypeRepository.save(newVaccine);
  }

  async update(id: number, vaccineDto: UpdateVaccineTypeDto) {
    const categoryDB = await this.vaccineTypeRepository.preload({
      id,
      ...vaccineDto,
    });
    if (!categoryDB) {
      throw new BadRequestException(`Selected element don't exist`);
    }
    return await this.vaccineTypeRepository.save(categoryDB);
  }
}
