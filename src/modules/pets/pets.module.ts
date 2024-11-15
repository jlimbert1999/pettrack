import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owners, Pets, Vaccinations } from './entities';
import { PetService } from './services/pet.service';
import { PetController } from './controllers/pet.controller';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Owners, Pets, Vaccinations]),
    FilesModule,
  ],
  controllers: [PetController],
  providers: [PetService],
})
export class PetsModule {}
