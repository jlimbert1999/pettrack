import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationParamsDto } from 'src/modules/common';
import { PetService } from '../services/pet.service';
import { CreateOwnerDto, CreatePetDto, UpdateOwnerDto } from '../dtos';

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

  @Patch('owner/:id')
  updateowner(@Param('id') id: string, @Body() ownerDto: UpdateOwnerDto) {
    return this.petService.updateOwner(id, ownerDto);
  }

  @Get('owner')
  findOwners(@Query() queryParams: PaginationParamsDto) {
    return this.petService.findOwnders(queryParams);
  }
}
