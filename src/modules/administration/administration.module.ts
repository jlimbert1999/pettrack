import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Breeds, Districts, MedicalCenter, TypesTreatments } from './entities';
import { BreedController, MedicalCenterController, TypeTreatmentController } from './controllers';
import { BreedService, MedicalCenterService, TypeTreatmentService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([TypesTreatments, MedicalCenter, Breeds, Districts])],
  controllers: [MedicalCenterController, TypeTreatmentController, BreedController],
  providers: [MedicalCenterService, TypeTreatmentService, BreedService],
  exports: [TypeOrmModule, BreedService, MedicalCenterService, TypeTreatmentService],
})
export class AdministrationModule {}
