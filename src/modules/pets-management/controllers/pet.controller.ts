import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { PaginationParamsDto } from 'src/modules/common';
import { BreedService } from 'src/modules/administration/services';
import { Species } from 'src/modules/administration/entities';
import { PetService } from '../services/pet.service';
import { CreatePetDto } from '../dtos';

@Controller('pets')
export class PetController {
  constructor(
    private petService: PetService,
    private breedService: BreedService,
  ) {}

  @Get()
  findAll(@Query() queryParams: PaginationParamsDto) {
    return this.petService.findAll(queryParams);
  }

  @Post()
  createPet(@Body() petDto: CreatePetDto) {
    return this.petService.create(petDto);
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
