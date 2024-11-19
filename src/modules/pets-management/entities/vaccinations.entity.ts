import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pets } from './pets.entity';
import { VaccineTypes } from 'src/modules/administration/entities';

@Entity()
export class Vaccinations {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  location: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => Pets, (pet) => pet.vaccinations)
  pet: Pets;

  @ManyToOne(() => VaccineTypes, (vaccineType) => vaccineType.vaccinations)
  vaccine_type: VaccineTypes;
}
