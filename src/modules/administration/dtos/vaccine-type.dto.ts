import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVaccineTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
export class UpdateVaccineTypeDto extends PartialType(CreateVaccineTypeDto) {}
