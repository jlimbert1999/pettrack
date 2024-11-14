import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pets } from './pets.entity';

@Entity()
export class Owners {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  first_name: string;

  @Column()
  middle_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ unique: true })
  dni: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  phone: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @OneToMany(() => Pets, (pet) => pet.owner, { cascade: true })
  pets: Pets[];
}
