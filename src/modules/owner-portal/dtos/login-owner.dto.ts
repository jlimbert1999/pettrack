import { Transform, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginOwnerDto {
  @IsDate({ message: 'Ingrese una fecha valida' })
  @Transform(({ value }) => new Date(value))
  birthDate: Date;

  @IsString()
  @IsNotEmpty()
  @MinLength(7, { message: 'El numero de carnet es invalido' })
  @Type(() => String)
  dni: string;
}
