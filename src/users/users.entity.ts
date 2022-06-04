import { Exclude } from 'class-transformer';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('Inserted User With id ', this.id);
  }
  @AfterUpdate()
  logUpdate() {
    console.log('Updated User With id ', this.id);
  }
  @AfterRemove()
  logREmove() {
    console.log('Removed User With id ', this.id);
  }
}
