import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMedicalCenterDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
export class UpdateMedicalCenterDto extends PartialType(CreateMedicalCenterDto) {}
