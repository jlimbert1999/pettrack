import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginationParamsDto } from 'src/modules/common';
import { CreateTypeTreatmentDto, UpdateTypeTreatmentDto } from '../dtos';
import { TreatmentCategory, TypesTreatments } from '../entities';

@Injectable()
export class TypeTreatmentService {
  constructor(
    @InjectRepository(TypesTreatments)
    private typeTreatmentRepository: Repository<TypesTreatments>,
  ) {}

  async findAll({ limit, offset }: PaginationParamsDto) {
    const [treatments, length] = await this.typeTreatmentRepository.findAndCount({
      take: limit,
      skip: offset,
    });
    return { treatments, length };
  }

  async create(treatmentDto: CreateTypeTreatmentDto) {
    const newTypeTreatment = this.typeTreatmentRepository.create(treatmentDto);
    return await this.typeTreatmentRepository.save(newTypeTreatment);
  }

  async update(id: number, treatmentDto: UpdateTypeTreatmentDto) {
    const typeTreatment = await this.typeTreatmentRepository.preload({
      id,
      ...treatmentDto,
    });
    if (!typeTreatment) {
      throw new BadRequestException(`Selected element don't exist`);
    }
    return await this.typeTreatmentRepository.save(typeTreatment);
  }

  async getCategories() {
    return await this.typeTreatmentRepository
      .createQueryBuilder('types')
      .select('DISTINCT types.category')
      .getRawMany();
  }

  async getTreatments(category?: TreatmentCategory) {
    return this.typeTreatmentRepository.find({ ...(category && { where: { category } }) });
  }
}
