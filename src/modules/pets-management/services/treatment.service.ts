import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MedicalCenter, TypesTreatments } from 'src/modules/administration/entities';
import { Pets, Treatments } from '../entities';
import { CreateTreatmentDto } from '../dtos';
import { PaginationParamsDto } from 'src/modules/common';

@Injectable()
export class TreatmentService {
  constructor(
    @InjectRepository(Treatments) private treatRepository: Repository<Treatments>,

    @InjectRepository(TypesTreatments) private typeTreatmentRepository: Repository<TypesTreatments>,
    @InjectRepository(MedicalCenter) private medicalCenterRepository: Repository<MedicalCenter>,
    @InjectRepository(Pets) private petRepository: Repository<Pets>,
  ) {}

  async create({ typeTreamentId, petId, medicalCenterId }: CreateTreatmentDto) {
    const [typeTreatment, medicalCenter, pet] = await Promise.all([
      this.typeTreatmentRepository.preload({ id: typeTreamentId }),
      this.medicalCenterRepository.preload({ id: medicalCenterId }),
      this.petRepository.preload({ id: petId }),
    ]);
    if (!typeTreatment || !medicalCenter || !pet) {
      throw new BadRequestException('Invalid params to create treatment');
    }
    const newTreatment = this.treatRepository.create({ pet, typeTreatment, medicalCenter });
    return await this.treatRepository.save(newTreatment);
  }

  async getPetTreaments(petId: string, { limit, offset }: PaginationParamsDto) {
    return await this.treatRepository.find({
      where: { pet: { id: petId } },
      relations: { typeTreatment: true, medicalCenter: true },
      take: limit,
      skip: offset,
    });
  }
}
