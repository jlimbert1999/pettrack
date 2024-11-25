import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginationParamsDto } from 'src/modules/common';
import { CreateMedicalCenterDto, UpdateMedicalCenterDto } from '../dtos';
import { MedicalCenter } from '../entities';

@Injectable()
export class MedicalCenterService {
  constructor(
    @InjectRepository(MedicalCenter)
    private medicalCenterRepository: Repository<MedicalCenter>,
  ) {}

  async findAll({ limit, offset }: PaginationParamsDto) {
    const [medicalCenters, length] = await this.medicalCenterRepository.findAndCount({
      take: limit,
      skip: offset,
    });
    return { medicalCenters, length };
  }

  async create(medicalCenterDto: CreateMedicalCenterDto) {
    const newMedicalCenter = this.medicalCenterRepository.create(medicalCenterDto);
    return await this.medicalCenterRepository.save(newMedicalCenter);
  }

  async update(id: number, medicalCenterDto: UpdateMedicalCenterDto) {
    const medicalCenterDB = await this.medicalCenterRepository.preload({
      id,
      ...medicalCenterDto,
    });
    if (!medicalCenterDB) {
      throw new BadRequestException(`Selected element don't exist`);
    }
    return await this.medicalCenterRepository.save(medicalCenterDB);
  }

  async getCenters() {
    return await this.medicalCenterRepository.find({});
  }
}
