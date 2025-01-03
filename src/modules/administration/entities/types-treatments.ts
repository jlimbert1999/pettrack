import { Treatments } from 'src/modules/pets-management/entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum TreatmentCategory {
  VACCINATION = 'VACUNACION',
  DEWORMING = 'DESPARASITACION',
}

@Entity()
export class TypesTreatments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: TreatmentCategory,
  })
  category: TreatmentCategory;

  @Column()
  name: string;

  @OneToMany(() => Treatments, (treatment) => treatment.typeTreatment)
  treatments: Treatments[];
}
