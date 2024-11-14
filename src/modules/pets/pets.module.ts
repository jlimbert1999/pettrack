import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owners, Pets, Vaccinations } from './entities';
import { PetService } from './services/pet.service';
import { PetController } from './controllers/pet.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Owners, Pets, Vaccinations])],
  controllers: [PetController],
  providers: [PetService],
})
export class PetsModule {}
