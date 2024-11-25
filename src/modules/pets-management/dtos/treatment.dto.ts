import { IsInt, IsUUID } from 'class-validator';

export class CreateTreatmentDto {
  @IsInt()
  typeTreamentId: number;

  @IsInt()
  medicalCenterId: number;

  @IsUUID()
  petId: string;
}
