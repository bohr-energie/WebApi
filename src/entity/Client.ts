import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";

@Entity("clients")
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ref_client: string;

  @CreateDateColumn({ type: "timestamp" })
  date_created: Date;

  @UpdateDateColumn({ type: "timestamp" })
  date_modified: Date;
}
