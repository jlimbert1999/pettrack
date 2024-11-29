import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { BreedService } from 'src/modules/administration/services';
import { Species } from 'src/modules/administration/entities';
import { FilterPetsDto } from '../dtos';
import { PetService } from '../services';

@Controller('pets')
export class PetController {
  constructor(
    private petService: PetService,
    private breedService: BreedService,
  ) {}

  @Get()
  findAll(@Query() queryParams: FilterPetsDto) {
    return this.petService.findAll(queryParams);
  }

  @Get(':id')
  getDetail(@Param('id') id: string) {
    return this.petService.getDetail(id);
  }

  @Get('types/breeds')
  getBreedBySpecies(@Query('species') species: Species) {
    return this.breedService.getBySpecies(species);
  }
}
