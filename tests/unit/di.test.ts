import "reflect-metadata";

import {
  destroyContainer,
  getInjection,
  initializeContainer,
} from "@/di/container";
import { MockUsersRepository } from "@/src/infrastructure/repositories/users.repository.mock";
import { MockAuthenticationService } from "@/src/infrastructure/services/authentication.service.mock";
import { afterEach, beforeEach, expect, it } from "vitest";

beforeEach(() => {
  initializeContainer();
});

afterEach(() => {
  destroyContainer();
});

it("should use Mock versions of repos and services", async () => {
  const authService = getInjection("IAuthenticationService");
  expect(authService).toBeInstanceOf(MockAuthenticationService);

  const usersRepository = getInjection("IUsersRepository");
  expect(usersRepository).toBeInstanceOf(MockUsersRepository);
});
