import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NullableColumn } from '@shared';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ length: 1, default: 'N' })
  emailVerified: string;

  @Column()
  password: string;

  @NullableColumn()
  emailValidationToken: string;

  @NullableColumn()
  refreshToken: string;

  @NullableColumn()
  resetPasswordToken: string;

  @NullableColumn()
  resetPasswordExpires: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
