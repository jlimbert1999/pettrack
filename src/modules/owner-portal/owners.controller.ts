import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { Public } from '../auth/decorators';
import { LoginOwnerDto } from './dtos';
import { OwnerRequest } from './decorators';
import { Owners } from '../pets-management/entities';
import { OwnerGuard } from './guards/owner.guard';
import { PetService, TreatmentService } from '../pets-management/services';

@Public()
@Controller('owners-portal')
export class OwnersController {
  constructor(
    private readonly ownersService: OwnersService,
    private treatmentService: TreatmentService,
    private petService: PetService,
  ) {}

  @Post('auth')
  login(@Body() body: LoginOwnerDto) {
    return this.ownersService.login(body);
  }

  @UseGuards(OwnerGuard)
  @Get('auth')
  checkAuth(@OwnerRequest() owner: Owners) {
    return this.ownersService.checkAuthStatus(owner.id);
  }

  @UseGuards(OwnerGuard)
  @Get('pets')
  create(@OwnerRequest() owner: Owners) {
    return this.ownersService.getPets(owner);
  }

  @Get('treatments/:id')
  getPetTreatments(@Param('id') petId: string) {
    return this.treatmentService.getPetTreaments(petId, { limit: 10, offset: 0 });
  }

  @Get('detail/:id')
  getPetDetail(@Param('id') petId: string) {
    return this.petService.getDetail(petId);
  }
}
