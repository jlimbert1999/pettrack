import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { PaginationParamsDto } from 'src/modules/common';
import { CreateBreedDto, UpdateBreedDto } from '../dtos';
import { BreedService } from '../services';

@Controller('breeds')
export class BreedController {
  constructor(private breedService: BreedService) {}

  @Get()
  findAll(@Query() queryParams: PaginationParamsDto) {
    return this.breedService.findAll(queryParams);
  }

  @Post()
  create(@Body() breedDto: CreateBreedDto) {
    return this.breedService.create(breedDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() breedDto: UpdateBreedDto) {
    return this.breedService.update(+id, breedDto);
  }
}
