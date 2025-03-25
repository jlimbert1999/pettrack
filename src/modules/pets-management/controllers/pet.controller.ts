import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { BreedService } from 'src/modules/administration/services';
import { Species } from 'src/modules/administration/entities';
import { CaptureLogDto, FilterPetsDto } from '../dtos';
import { PetService } from '../services';
import { UserRequest } from 'src/modules/auth/decorators';
import { Users } from 'src/modules/users/entities';
import { PaginationParamsDto } from 'src/modules/common';

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

  @Post('capture/:id')
  create(@Body() body: CaptureLogDto, @Param('id') id: string, @UserRequest() user: Users) {
    return this.petService.createCaptureLog(id, body, user);
  }

  @Get('capture/:id')
  getCaptureLogs(@Param('id') id: string, @Query() queryParams: PaginationParamsDto) {
    return this.petService.getCaptureLogs(id, queryParams);
  }
}
