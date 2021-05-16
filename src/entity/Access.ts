import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Client } from "./Client";
import { Contract } from "./Contract";
import { User } from "./User";

@Entity("access")
export class Access extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Client)
  @JoinColumn()
  client: Client;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Contract)
  @JoinColumn()
  contract: Contract;

  @CreateDateColumn({ type: "timestamp" })
  date_created: Date;

  @UpdateDateColumn({ type: "timestamp" })
  date_modified: Date;
}
