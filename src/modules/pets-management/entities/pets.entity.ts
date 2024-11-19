import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Owners } from './owners.entity';
import { Vaccinations } from './vaccinations.entity';

export enum PetSpecies {
  feline = 'felino',
  canine = 'canino',
}
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
  @Generated('increment') // !No support some hosts
  code: number;

  @Column()
  age: number;

  @Column({ type: 'enum', enum: PetSpecies })
  species: PetSpecies;

  @Column({ nullable: true })
  image: string | null;

  @Column()
  breed: string;

  @Column()
  color: string;

  @Column({ type: 'enum', enum: AnimalSex })
  sex: AnimalSex;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ nullable: true })
  description: string;

  @Column()
  is_neutered: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  neuter_date: Date | null;

  @ManyToOne(() => Owners, (owner) => owner.pets, { onDelete: 'CASCADE' })
  owner: Owners;

  @OneToMany(() => Vaccinations, (vaccination) => vaccination.pet)
  vaccinations: Vaccinations[];
}
