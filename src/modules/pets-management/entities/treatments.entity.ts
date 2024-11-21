import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Pets } from './pets.entity';
import { MedicalCenter, TypesTreatments } from 'src/modules/administration/entities';

@Entity()
export class Treatments {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamptz' })
  date: Date;

  @ManyToOne(() => MedicalCenter, (medicalCenter) => medicalCenter.treatments)
  medicalCenter: MedicalCenter;

  @ManyToOne(() => Pets, (pet) => pet.treatments)
  pet: Pets;

  @ManyToOne(() => TypesTreatments, (type) => type.treatments)
  type: TypesTreatments;
}
