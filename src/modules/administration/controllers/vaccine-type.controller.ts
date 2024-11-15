import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateVaccineTypeDto } from '../dtos/vaccine-type.dto';
import { VaccineTypeService } from '../services/vaccine-type.service';
import { PaginationParamsDto } from 'src/modules/common';

@Controller('vaccine-types')
export class VaccineTypeController {
  constructor(private vaccineTypeService: VaccineTypeService) {}

  @Get()
  findAll(@Query() queryParams: PaginationParamsDto) {
    return this.vaccineTypeService.findAll(queryParams);
  }

  @Post()
  create(@Body() vaccineTypeDto: CreateVaccineTypeDto) {
    return this.vaccineTypeService.create(vaccineTypeDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() vaccineTypeDto: CreateVaccineTypeDto,
  ) {
    return this.vaccineTypeService.update(+id, vaccineTypeDto);
  }
}
