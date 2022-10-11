import bcrypt from "bcryptjs";
import type { User, PrismaClient } from "@prisma/client";

type UserData = {
  name: string;
  username: string
  password: string
}

export class CreateUser {
  constructor(private readonly db: PrismaClient) { }

  async execute({ name, username, password }: UserData): Promise<User | null> {
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