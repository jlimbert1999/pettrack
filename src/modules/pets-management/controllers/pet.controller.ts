import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PaginationParamsDto } from 'src/modules/common';
import { PetService } from '../services/pet.service';
import { CreatePetDto } from '../dtos';

@Controller('pets')
export class PetController {
  constructor(private petService: PetService) {}

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
}
