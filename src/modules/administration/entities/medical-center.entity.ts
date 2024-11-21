import { Treatments } from 'src/modules/pets-management/entities';
import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from 'typeorm';

@Entity()
export class MedicalCenter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @OneToMany(() => Treatments, (treatment) => treatment.medicalCenter)
  treatments: Treatments[];
}
