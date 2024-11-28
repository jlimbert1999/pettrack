import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { Public } from '../auth/decorators';
import { LoginOwnerDto } from './dtos';
import { OwnerRequest } from './decorators';
import { Owners } from '../pets-management/entities';
import { OwnerGuard } from './guards/owner.guard';

@Public()
@Controller('owners')
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}

  @Post('auth')
  login(@Body() body: LoginOwnerDto) {
    return this.ownersService.login(body);
  }

  @UseGuards(OwnerGuard)
  @Get('auth')
  checkAuth(@OwnerRequest() owner: Owners) {
    console.log(owner);
    return this.ownersService.checkAuthStatus(owner.id);
  }
  // @Post()
  // create(@Body() createOwnerDto: CreateOwnerDto) {
  //   return this.ownersService.create(createOwnerDto);
  // }

  // @Get()
  // findAll() {
  //   return this.ownersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.ownersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOwnerDto: UpdateOwnerDto) {
  //   return this.ownersService.update(+id, updateOwnerDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ownersService.remove(+id);
  // }
}
