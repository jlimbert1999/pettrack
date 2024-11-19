import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owners, Pets, Vaccinations } from './entities';
import { PetService } from './services/pet.service';
import { PetController } from './controllers/pet.controller';
import { FilesModule } from '../files/files.module';
import { OwnerService } from './services/owner.service';
import { OwnerController } from './controllers/owner.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Owners, Pets, Vaccinations]), FilesModule],
  controllers: [PetController, OwnerController],
  providers: [PetService, OwnerService],
})
export class PetsManagementModule {}
