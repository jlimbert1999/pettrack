import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TypeTreatmentService } from '../services';
import { CreateTypeTreatmentDto, UpdateTypeTreatmentDto } from '../dtos';
import { PaginationParamsDto } from 'src/modules/common';

@Controller('types-treatments')
export class TypeTreatmentController {
  constructor(private vaccineTypeService: TypeTreatmentService) {}

  @Get()
  findAll(@Query() queryParams: PaginationParamsDto) {
    return this.vaccineTypeService.findAll(queryParams);
  }

  @Post()
  create(@Body() vaccineTypeDto: CreateTypeTreatmentDto) {
    return this.vaccineTypeService.create(vaccineTypeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() vaccineTypeDto: UpdateTypeTreatmentDto) {
    return this.vaccineTypeService.update(+id, vaccineTypeDto);
  }
}
