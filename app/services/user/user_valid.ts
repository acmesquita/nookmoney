import bcrypt from "bcryptjs";
import type { PrismaClient, User } from "@prisma/client";

type UserData = {
  username: string
  password: string
}

export class UserValidToLogin {
  constructor(private readonly db: PrismaClient) {}

  async execute({ username, password }: UserData): Promise<User | null> {
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