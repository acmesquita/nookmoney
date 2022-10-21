import bcrypt from "bcryptjs";
import type { PrismaClient, User } from "@prisma/client";
import { InvalidParams } from "~/errors/invalid-params.error";

type UserData = {
  username: string
  password: string
}

export class UserValidToLogin {
  constructor(private readonly db: PrismaClient) {}

  async execute({ username, password }: UserData): Promise<User | null> {
    if (!username || !password) {
      throw new InvalidParams()
    }
    const user = await this.db.user.findUnique({
      where: { username },
    });

    if (!user) return null;
  
    const isCorrectPassword = await bcrypt.compare(
      password,
      user.passwordHash
    );
    if (!isCorrectPassword) return null;

    return user;
  }
}