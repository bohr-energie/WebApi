import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Client } from "./Client";

@Entity("logins")
export class Login extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Client)
  @JoinColumn()
  client: Client;

  @Column()
  password_hash: string;

  @Column()
  count: number;

  @CreateDateColumn({ type: "timestamp" })
  date_created: Date;

  @UpdateDateColumn({ type: "timestamp" })
  date_modified: Date;
}
