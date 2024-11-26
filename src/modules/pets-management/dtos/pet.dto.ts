import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDate,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { AnimalSex } from '../entities';
import { Transform, Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

class PetDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  image?: string;

  @IsInt()
  @Type(() => Number)
  breedId: number;

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

  @IsDate()
  @Transform(({ value }) => value && new Date(value))
  @IsOptional()
  birthDate?: Date;
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

  @IsInt()
  districtId: number;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PetDto)
  @ArrayMinSize(1)
  pets: PetDto[];

  @IsDate()
  @Transform(({ value }) => new Date(value))
  birthDate: Date;
}

export class UpdateOwnerDto extends PartialType(CreateOwnerDto) {}

export class CreatePetDto extends PetDto {
  @IsUUID()
  ownderId: string;
}
