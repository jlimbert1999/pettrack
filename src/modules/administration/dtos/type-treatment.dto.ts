import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TreatmentCategory } from '../entities';

export class CreateTypeTreatmentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(TreatmentCategory)
  category: TreatmentCategory;
}
export class UpdateTypeTreatmentDto extends PartialType(CreateTypeTreatmentDto) {}
