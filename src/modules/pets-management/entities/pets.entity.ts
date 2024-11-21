import { Column, CreateDateColumn, Entity, Generated, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Owners } from './owners.entity';
import { Treatments } from './treatments.entity';
import { Breeds } from 'src/modules/administration/entities/breeds.entity';

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

  @Column({ type: 'timestamptz', nullable: true })
  birthDate: Date | null;

  @Column({ nullable: true })
  image: string | null;

  @Column()
  color: string;

  @Column({ type: 'enum', enum: AnimalSex })
  sex: AnimalSex;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ nullable: true })
  description: string | null;

  @Column()
  is_neutered: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  neuter_date: Date | null;

  @ManyToOne(() => Breeds, (breed) => breed.pets, { eager: true })
  breed: Breeds;

  @ManyToOne(() => Owners, (owner) => owner.pets, { onDelete: 'CASCADE' })
  owner: Owners;

  @OneToMany(() => Treatments, (treatment) => treatment.pet)
  treatments: Treatments[];
}
