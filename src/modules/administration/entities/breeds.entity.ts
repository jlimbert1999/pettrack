import { Pets } from 'src/modules/pets-management/entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
export enum Species {
  CANINE = 'CANINO',
  FELINE = 'FELINO',
}
@Entity()
export class Breeds {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: Species,
  })
  species: Species;

  @OneToMany(() => Pets, (pet) => pet.breed)
  pets: Pets[];
}
