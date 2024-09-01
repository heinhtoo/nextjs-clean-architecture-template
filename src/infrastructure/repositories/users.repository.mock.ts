import { IUsersRepository } from "@/src/application/repositories/users.repository.interface";
import { hashSync } from "@node-rs/argon2";
import { User } from "@prisma/client";
import { injectable } from "inversify";

@injectable()
export class MockUsersRepository implements IUsersRepository {
  private _users: User[];

  constructor() {
    const hashOptions = {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    };

    this._users = [
      {
        id: "1",
        username: "one",
        passwordHash: hashSync("password-one", hashOptions),
      },
      {
        id: "2",
        username: "two",
        passwordHash: hashSync("password-two", hashOptions),
      },
      {
        id: "3",
        username: "three",
        passwordHash: hashSync("password-three", hashOptions),
      },
    ];
  }

  async getUser(id: string): Promise<User | undefined> {
    const user = this._users.find((u) => u.id === id);
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const user = this._users.find((u) => u.username === username);
    return user;
  }

  async createUser(input: User): Promise<User> {
    this._users.push(input);
    return input;
  }
}
