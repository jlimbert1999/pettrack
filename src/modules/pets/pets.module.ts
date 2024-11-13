import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owners, Pets, Vaccinations } from './entities';
import { PetService } from './services/pet.service';

@Module({
  imports: [TypeOrmModule.forFeature([Owners, Pets, Vaccinations])],
  controllers: [],
  providers: [PetService],
})
export class PetsModule {}
