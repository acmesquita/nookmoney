import {
  redirect,
} from "@remix-run/node";

import { db } from "../database/db.server";
import { CreateUser } from "~/services/user/create";
import { UserValidToLogin } from "~/services/user/user_valid";
import { getUserSession, logout } from "./cookie_storage.server";
import { LoadUser } from "~/services/user/load";

type SignInForm = {
  username: string;
  password: string;
};

type SignUpForm = {
  name: string;
  username: string;
  password: string;
};

type UserResponse = {
  id: string
  username: string
}

export async function register({
  name,
  username,
  password,
}: SignUpForm): Promise<UserResponse | null>{
  const user = await new CreateUser(db).execute({ name, username, password })

  if (user) {
    return { id: user.id, username };
  }

  return null
}

export async function login({
  username,
  password,
}: SignInForm): Promise<UserResponse | null> {
  const user = await new UserValidToLogin(db).execute({ username, password })

  if (user) {
    return { id: user.id, username };
  } 

  return null
}

export async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") return null;
  return userId;
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    const searchParams = new URLSearchParams([
      ["redirectTo", redirectTo],
    ]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
}

export async function getUser(request: Request) {
  const userId = await getUserId(request);
  if (typeof userId !== "string") {
    return null;
  }

  try {
    return await new LoadUser(db).execute({ userId })
  } catch {
    throw logout(request);
  }
}

export * from './cookie_storage.server'