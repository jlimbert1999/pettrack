import { PartialType, PickType } from '@nestjs/mapped-types';
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsInt,
  IsEnum,
  IsBoolean,
  IsDate,
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { AnimalSex } from '../entities';

export class CreatePetDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim().replace(/\s+/g, ' '))
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
  @Transform(({ value }) => value?.trim().replace(/\s+/g, ' '))
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

export class UpdatePetDto extends PartialType(CreatePetDto) {}

export class CaptureLogDto {
  @IsString()
  @IsOptional()
  location: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class CreatePetWithCaptureDto {
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CreatePetDto)
  pet: CreatePetDto;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CaptureLogDto)
  log: CaptureLogDto;
}

