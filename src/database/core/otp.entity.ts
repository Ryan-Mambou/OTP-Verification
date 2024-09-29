import { BaseEntity } from './base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Otp extends BaseEntity {
  @Column()
  otp: String;

  @Column()
  expiresAt: Date;

  @Column({ default: false })
  isUsed: boolean;
}
