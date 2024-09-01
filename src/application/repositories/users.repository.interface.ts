import { User } from "@/src/entities/models/user";
export interface IUsersRepository {
  getUser(id: string): Promise<User | undefined | null>;
  getUserByUsername(username: string): Promise<User | undefined | null>;
  createUser(input: User): Promise<User>;
}
