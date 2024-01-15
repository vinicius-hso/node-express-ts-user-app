// import { MockAppDataSource } from "../ts"
import { DataSource } from "typeorm";
import { IUser } from "../ts";
import { User } from "../models";
import dataSource from "../database";

export class UserService {
  dataSource: DataSource;

  constructor(database = dataSource) {
    this.dataSource = database;
  }

  public async create(user: IUser): Promise<Response> {
    const newUser = new User();

    Object.assign(newUser, user);

    const result: any = await this.dataSource.manager
      .save(User, newUser)
      .catch((error) => {
        return { error: error.message };
      });

    return result;
  }

  public async listAll(): Promise<IUser[]> {
    const users: IUser[] | any = await this.dataSource
      .getRepository(User)
      .find();
    return users;
  }

  public async getByEmail(email: any): Promise<IUser> {
    const user: IUser[] | any = await this.dataSource
      .getRepository(User)
      .findOne({ where: { email: email } });

    return user;
  }

  public async getById(id: string): Promise<IUser> {
    const user: IUser | any = await this.dataSource
      .getRepository(User)
      .findOne({ where: { id: id } });

    return user;
  }
}
