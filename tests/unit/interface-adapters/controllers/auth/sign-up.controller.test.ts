import "reflect-metadata";
import { afterEach, beforeEach, expect, it } from "vitest";

import { SESSION_COOKIE } from "@/config";
import { destroyContainer, initializeContainer } from "@/di/container";
import { InputParseError } from "@/src/entities/errors/common";
import { AuthenticationError } from "@/src/entities/errors/auth";
import { signUpController } from "@/src/interface-adapters/auth/sign-up.controller";

beforeEach(() => {
  initializeContainer();
});

afterEach(() => {
  destroyContainer();
});

// A great guide on test names
// https://www.epicweb.dev/talks/how-to-write-better-test-names
it("returns cookie", async () => {
  const { cookie, user } = await signUpController({
    username: "nikolovlazar",
    password: "password",
    confirmPassword: "password",
  });

  expect(user).toBeDefined();
  expect(cookie).toMatchObject({
    name: SESSION_COOKIE,
    value: `random_session_id_${user.id}`,
    attributes: {},
  });
});

it("throws for invalid input", () => {
  // empty object
  expect(signUpController({})).rejects.toBeInstanceOf(InputParseError);

  // below min length
  expect(
    signUpController({
      username: "no",
      password: "no",
      confirmPassword: "nah",
    })
  ).rejects.toBeInstanceOf(InputParseError);

  // wrong passwords
  expect(
    signUpController({
      username: "nikolovlazar",
      password: "password",
      confirmPassword: "passwords",
    })
  ).rejects.toBeInstanceOf(InputParseError);
});

it("throws for existing username", () => {
  expect(
    signUpController({
      username: "one",
      password: "doesntmatter",
      confirmPassword: "doesntmatter",
    })
  ).rejects.toBeInstanceOf(AuthenticationError);
});
