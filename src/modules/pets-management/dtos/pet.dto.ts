import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { AnimalSex, PetSpecies } from '../entities';
import { Transform, Type } from 'class-transformer';
import { OmitType, PartialType } from '@nestjs/mapped-types';

class PetDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsPositive()
  age: number;

  @IsEnum(PetSpecies)
  species: PetSpecies;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  image?: string;

  @IsString()
  @IsNotEmpty()
  breed: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsEnum(AnimalSex)
  sex: AnimalSex;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  is_neutered: boolean;

  @IsDate()
  @Transform(({ value }) => value && new Date(value))
  @IsOptional()
  neuter_date?: Date;
}

export class CreateOwnerDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  middle_name: string;

  @IsString()
  @IsOptional()
  last_name?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsNotEmpty()
  dni: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PetDto)
  @ArrayMinSize(1)
  pets: PetDto[];
}

export class UpdateOwnerDto extends PartialType(CreateOwnerDto) {}

export class CreatePetDto extends PetDto {
  @IsUUID()
  ownderId: string;
}
