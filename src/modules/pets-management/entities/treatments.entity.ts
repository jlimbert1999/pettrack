import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MedicalCenter, TypesTreatments } from 'src/modules/administration/entities';
import { Pets } from './pets.entity';

@Entity()
export class Treatments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz' })
  date: Date;

  @ManyToOne(() => MedicalCenter, (medicalCenter) => medicalCenter.treatments)
  medicalCenter: MedicalCenter;

  @ManyToOne(() => Pets, (pet) => pet.treatments)
  pet: Pets;

  @ManyToOne(() => TypesTreatments, (type) => type.treatments)
  typeTreatment: TypesTreatments;
}
