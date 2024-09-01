import { injectable } from "inversify";
import { startSpan, captureException } from "@sentry/nextjs";

import { IUsersRepository } from "@/src/application/repositories/users.repository.interface";
import { DatabaseOperationError } from "@/src/entities/errors/common";
import { User } from "@/src/entities/models/user";
import { prismaClient } from "@/prisma";

@injectable()
export class UsersRepository implements IUsersRepository {
  async getUser(id: string): Promise<User | undefined | null> {
    return await startSpan({ name: "UsersRepository > getUser" }, async () => {
      try {
        const query = prismaClient.user.findFirst({
          where: {
            id,
          },
        });

        const user = await startSpan(
          {
            name: "Find User by Id",
            op: "db.query",
            attributes: { "db.system": "mongodb" },
          },
          () => query
        );

        return user;
      } catch (err) {
        captureException(err);
        throw err; // TODO: convert to Entities error
      }
    });
  }

  async getUserByUsername(username: string): Promise<User | undefined | null> {
    return await startSpan(
      { name: "UsersRepository > getUserByUsername" },
      async () => {
        try {
          const query = prismaClient.user.findFirst({
            where: {
              username,
            },
          });

          const user = await startSpan(
            {
              name: "Find User by Name",
              op: "db.query",
              attributes: { "db.system": "mongodb" },
            },
            () => query
          );

          return user;
        } catch (err) {
          captureException(err);
          throw err; // TODO: convert to Entities error
        }
      }
    );
  }

  async createUser(input: User): Promise<User> {
    return await startSpan(
      { name: "UsersRepository > createUser" },
      async () => {
        try {
          const query = prismaClient.user.create({
            data: {
              username: input.username,
              passwordHash: input.passwordHash,
            },
          });

          const created = await startSpan(
            {
              name: "Create user",
              op: "db.query",
              attributes: { "db.system": "mongodb" },
            },
            () => query
          );

          if (created) {
            return created;
          } else {
            throw new DatabaseOperationError("Cannot create user.");
          }
        } catch (err) {
          captureException(err);
          throw err; // TODO: convert to Entities error
        }
      }
    );
  }
}
