import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateMedicalCenterDto } from '../dtos/medical-center.dto';
import { MedicalCenterService } from '../services/medical-center.service';
import { PaginationParamsDto } from 'src/modules/common';

@Controller('centers')
export class MedicalCenterController {
  constructor(private vaccineTypeService: MedicalCenterService) {}

  @Get()
  findAll(@Query() queryParams: PaginationParamsDto) {
    return this.vaccineTypeService.findAll(queryParams);
  }

  @Post()
  create(@Body() vaccineTypeDto: CreateMedicalCenterDto) {
    return this.vaccineTypeService.create(vaccineTypeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() vaccineTypeDto: CreateMedicalCenterDto) {
    return this.vaccineTypeService.update(+id, vaccineTypeDto);
  }
}
