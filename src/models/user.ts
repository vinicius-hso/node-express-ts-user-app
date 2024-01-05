import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { UserRole } from "../ts";

export type UserRoleType = "admin" | "customer" | "manager";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 100 })
  password: string;

  // ! não insere por padrão (bug)
  // @Column({ type: "enum", enum: UserRole, default: UserRole.CUSTOMER })
  // role: UserRole;

  // ! não insere por padrão (bug)
  @Column({
    type: "enum",
    enum: ["admin", "customer", "manager"],
    default: "customer",
  })
  role: UserRoleType;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;
}
