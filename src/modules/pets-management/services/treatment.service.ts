import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MedicalCenter, TypesTreatments } from 'src/modules/administration/entities';
import { Pets, Treatments } from '../entities';
import { CreateTreatmentDto, FilterTreatmentDto } from '../dtos';

@Injectable()
export class TreatmentService {
  constructor(
    @InjectRepository(Treatments) private treatRepository: Repository<Treatments>,

    @InjectRepository(TypesTreatments) private typeTreatmentRepository: Repository<TypesTreatments>,
    @InjectRepository(MedicalCenter) private medicalCenterRepository: Repository<MedicalCenter>,
    @InjectRepository(Pets) private petRepository: Repository<Pets>,
  ) {}

  async create({ typeTreamentId, petIds, medicalCenterId }: CreateTreatmentDto) {
    const [typeTreatment, medicalCenter, ...pets] = await Promise.all([
      this.typeTreatmentRepository.preload({ id: typeTreamentId }),
      this.medicalCenterRepository.preload({ id: medicalCenterId }),
      ...petIds.map((id) => this.petRepository.preload({ id: id })),
    ]);
    if (!typeTreatment || !medicalCenter || pets.length === 0) {
      throw new BadRequestException('Invalid params to create treatment');
    }
    const newTreatments = pets.map((pet) => this.treatRepository.create({ pet, typeTreatment, medicalCenter }));
    return await Promise.all(newTreatments.map((element) => this.treatRepository.save(element)));
  }

  async getPetTreaments(petId: string, { limit = 10, offset = 0, category }: FilterTreatmentDto) {
    return await this.treatRepository.find({
      where: { pet: { id: petId }, ...(category && { typeTreatment: { category } }) },
      relations: { typeTreatment: true, medicalCenter: true },
      take: limit,
      skip: offset,
      order: { date: 'DESC' },
    });
  }
}
