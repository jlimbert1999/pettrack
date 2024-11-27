import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MedicalCenterService, TypeTreatmentService } from 'src/modules/administration/services';

import { TreatmentCategory } from 'src/modules/administration/entities';
import { TreatmentService } from '../services';
import { CreateTreatmentDto, FilterTreatmentDto } from '../dtos';
import { PaginationParamsDto } from 'src/modules/common';

@Controller('treatments')
export class TreatmentController {
  constructor(
    private treatmentService: TreatmentService,
    private typeTreatmentService: TypeTreatmentService,
    private medicalCenterService: MedicalCenterService,
  ) {}

  @Post()
  create(@Body() treamentDto: CreateTreatmentDto) {
    return this.treatmentService.create(treamentDto);
  }

  @Get('pet/:id')
  getPetTreatments(@Param('id') petId: string, @Query() queryParams: FilterTreatmentDto) {
    return this.treatmentService.getPetTreaments(petId, queryParams);
  }

  @Get('centers')
  getMedicalCenters() {
    return this.medicalCenterService.getCenters();
  }

  @Get('categories')
  getCategories() {
    return this.typeTreatmentService.getCategories();
  }

  @Get('types')
  getTypesTreatments(@Query('category') category?: TreatmentCategory) {
    return this.typeTreatmentService.getTreatments(category);
  }
}
