import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Pets } from './pets.entity';
import { Districts } from 'src/modules/administration/entities';

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

  @ManyToOne(() => Districts, (owner) => owner.owners, { eager: true })
  district: Districts;

  @Column({ type: 'timestamptz' })
  birthDate: Date;
}
