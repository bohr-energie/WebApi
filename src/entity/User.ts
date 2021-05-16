import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Client } from "./Client";
export const civilities = ["M", "Mme", "Mlle"];
@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Client)
  @JoinColumn()
  client: Client;

  @Column()
  civility: string;

  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  function: string;

  @Column()
  role: string;

  @Column({ nullable: true })
  reset_password_token: string;

  @Column({ nullable: true })
  reset_password_expires: Date;

  @CreateDateColumn({ type: "timestamp" })
  date_created: Date;

  @UpdateDateColumn({ type: "timestamp" })
  date_modified: Date;
}
