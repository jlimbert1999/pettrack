import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdministrationModule } from '../administration/administration.module';
import { FilesModule } from '../files/files.module';

import { OwnerController, PetController, TreatmentController } from './controllers';
import { OwnerService, PetService, TreatmentService } from './services';
import { Owners, Pets, Treatments } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Owners, Pets, Treatments]), FilesModule, AdministrationModule],
  controllers: [PetController, OwnerController, TreatmentController],
  providers: [PetService, OwnerService, TreatmentService],
  exports: [TypeOrmModule, TreatmentService, PetService],
})
export class PetsManagementModule {}
