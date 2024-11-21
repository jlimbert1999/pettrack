import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Owners, Pets, Treatments } from './entities';
import { FilesModule } from '../files/files.module';
import { OwnerController, PetController } from './controllers';
import { OwnerService, PetService, VaccinationService } from './services';
import { AdministrationModule } from '../administration/administration.module';

@Module({
  imports: [TypeOrmModule.forFeature([Owners, Pets, Treatments]), FilesModule, AdministrationModule],
  controllers: [PetController, OwnerController],
  providers: [PetService, OwnerService, VaccinationService],
})
export class PetsManagementModule {}
