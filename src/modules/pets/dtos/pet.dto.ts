import {
  IsArray,
  IsBoolean,
  IsDateString,
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

class PetDto {
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
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsBoolean()
  is_neutered: boolean;

  @IsDateString()
  @Transform(({ value }) => new Date(value))
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
  @IsNotEmpty()
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
  pets: PetDto[];
}
export class CreatePetDto extends PetDto {
  @IsUUID()
  ownderId: string;
}
