import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Species } from '../entities';

export class CreateBreedDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(Species)
  species: Species;
}
export class UpdateBreedDto extends PartialType(CreateBreedDto) {}
