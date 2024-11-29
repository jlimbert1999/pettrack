import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { PaginationParamsDto } from 'src/modules/common';

export class FilterPetsDto extends PaginationParamsDto {
  @IsOptional()
  @IsNotEmpty()
  owner?: string;

  @IsInt()
  @IsOptional()
  district?: number;
}
