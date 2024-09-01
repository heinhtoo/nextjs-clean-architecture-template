import { User } from "@prisma/client";

export interface IUsersRepository {
  getUser(id: string): Promise<User | undefined | null>;
  getUserByUsername(username: string): Promise<User | undefined | null>;
  createUser(input: User): Promise<User>;
}
