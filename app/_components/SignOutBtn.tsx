"use client";
import React from "react";
import { Button } from "./ui/button";
import { signOut } from "../(auth)/actions";

function SignOutBtn({ sessionId }: { sessionId: string | undefined }) {
  return sessionId ? (
    <Button
      onClick={() => {
        signOut();
      }}
    >
      SignOut
    </Button>
  ) : (
    <></>
  );
}

export default SignOutBtn;
