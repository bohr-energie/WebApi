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

@Entity("companies")
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Client)
  @JoinColumn()
  client: Client;

  @Column()
  company: string;

  @Column()
  siret: string;

  @Column()
  ape: string;

  @Column()
  address: string;

  @Column()
  postalcode: string;

  @Column()
  city: string;

  @CreateDateColumn({ type: "timestamp" })
  date_created: Date;

  @UpdateDateColumn({ type: "timestamp" })
  date_modified: Date;
}
