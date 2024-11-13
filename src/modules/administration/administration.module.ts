import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VaccineTypes } from './entities';
import { VaccineTypeService } from './services/vaccine-type.service';
import { VaccineTypeController } from './controllers/vaccine-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VaccineTypes])],
  controllers: [VaccineTypeController],
  providers: [VaccineTypeService],
})
export class AdministrationModule {}
