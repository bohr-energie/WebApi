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

@Entity("contracts")
export class Contract extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Client)
  @JoinColumn()
  client: Client;

  @Column()
  pdl: string;

  @CreateDateColumn({ type: "timestamp" })
  date_created: Date;

  @UpdateDateColumn({ type: "timestamp" })
  date_modified: Date;
}
