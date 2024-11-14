import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PaginationParamsDto } from 'src/common';
import { PetService } from '../services/pet.service';
import { CreateOwnerDto, CreatePetDto } from '../dtos';

@Controller('pets')
export class PetController {
  constructor(private petService: PetService) {}

  @Get()
  findPets(@Query() queryParams: PaginationParamsDto) {
    return this.petService.findPets(queryParams);
  }

  @Post()
  createPet(@Body() petDto: CreatePetDto) {
    return this.petService.createPet(petDto);
  }

  @Post('owner')
  createOwnder(@Body() ownerDto: CreateOwnerDto) {
    return this.petService.createOwner(ownerDto);
  }

  @Get('owner')
  findOwners(@Query() queryParams: PaginationParamsDto) {
    return this.petService.findOwnders(queryParams);
  }
}
