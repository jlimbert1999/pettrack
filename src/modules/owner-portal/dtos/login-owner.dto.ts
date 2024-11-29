import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginOwnerDto {
  @IsDate({ message: 'Ingrese una fecha valida' })
  @Transform(({ value }) => new Date(value))
  birthDate: Date;

  @IsString()
  @IsNotEmpty()
  @MaxLength(8, { message: 'El numero de carnet es invalido' })
  dni: string;
}
