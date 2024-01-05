import { UserRole } from "./UserRole";

export interface IUser {
  id?: string;
  name?: string;
  password: string;
  role?: UserRole;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}
