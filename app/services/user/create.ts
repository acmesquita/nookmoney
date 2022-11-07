import bcrypt from "bcryptjs";
import type { User, PrismaClient } from "@prisma/client";
import { InvalidParams } from "~/errors/invalid-params.error";

type UserData = {
  name: string;
  username: string
  password: string
}

export class CreateUser {
  constructor(private readonly db: PrismaClient) { }

  async execute({ name, username, password }: UserData): Promise<User | null> {

    if (!name || !username || !password) {
      throw new InvalidParams()
    }

    const passwordHash = await bcrypt.hash(password, 10);

    return await this.db.user.create({
      data: {
        name,
        username,
        passwordHash,
        goalId: ''
      }
    })
  }
}