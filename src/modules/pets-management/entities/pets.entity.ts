import { Column, CreateDateColumn, Entity, Generated, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Breeds } from 'src/modules/administration/entities/breeds.entity';
import { CaptureLog } from './capture-log.entity';
import { Treatments } from './treatments.entity';
import { Owners } from './owners.entity';

export enum AnimalSex {
  male = 'macho',
  female = 'hembra',
}

@Entity()
export class Pets {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'int',
    unique: true,
  })
  @Generated('increment')
  code: number;

  @Column({ type: 'timestamptz', nullable: true })
  birthDate: Date | null;

  @Column({ nullable: true })
  image: string | null;

  @Column()
  color: string;

  @Column({ type: 'enum', enum: AnimalSex })
  sex: AnimalSex;

  @Column({ nullable: true })
  description: string | null;

  @Column()
  is_neutered: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  neuter_date: Date | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => Breeds, (breed) => breed.pets, { eager: true, nullable: false })
  breed: Breeds;

  @ManyToOne(() => Owners, (owner) => owner.pets, { onDelete: 'CASCADE' })
  owner: Owners;

  @OneToMany(() => Treatments, (treatment) => treatment.pet)
  treatments: Treatments[];

  @OneToMany(() => CaptureLog, (log) => log.pet, { cascade: true })
  captures: CaptureLog[];
}
