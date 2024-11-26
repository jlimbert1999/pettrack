import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PaginationParamsDto } from 'src/modules/common';
import { OwnerService } from '../services/owner.service';
import { CreateOwnerDto, UpdateOwnerDto } from '../dtos';

@Controller('owners')
export class OwnerController {
  constructor(private ownerService: OwnerService) {}

  @Get()
  findOwners(@Query() queryParams: PaginationParamsDto) {
    return this.ownerService.findAll(queryParams);
  }

  @Post()
  create(@Body() ownerDto: CreateOwnerDto) {
    return this.ownerService.create(ownerDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() ownerDto: UpdateOwnerDto) {
    return this.ownerService.update(id, ownerDto);
  }

  @Get('districts')
  getDistricts() {
    return this.ownerService.getDistricts();
  }
}
