import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsInt, IsOptional, IsUUID } from 'class-validator';
import { TreatmentCategory } from 'src/modules/administration/entities';
import { PaginationParamsDto } from 'src/modules/common';

export class CreateTreatmentDto {
  @IsInt()
  typeTreamentId: number;

  @IsInt()
  medicalCenterId: number;

  @IsUUID('all', { each: true })
  petIds: string[];

  @IsDate()
  @Transform(({ value }) => value && new Date(value))
  date: Date;
}

export class FilterTreatmentDto extends PaginationParamsDto {
  @IsEnum(TreatmentCategory)
  @IsOptional()
  category?: TreatmentCategory | null;
}
