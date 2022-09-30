import type { PrismaClient } from "@prisma/client";

type UserData = {
  userId?: string;
  username?: string;
}

type UserResponse = {
  id: string;
  username: string;
  name: string;
}

export class LoadUser {
  constructor(private readonly db: PrismaClient) {}

  async execute({ userId, username }: UserData): Promise<UserResponse | null> {

    if (username) {
      return this.findByUsername(username)
    } else if (userId) {
      return this.findByUserId(userId)
    }
    return null
  }

  private async findByUserId(userId: string): Promise<UserResponse | null> {
    const user = await this.db.user.findUnique({
      where: { id: userId },
      select: { id: true, username: true, name: true },
    });

    return user;
  }

  private async findByUsername(username: string): Promise<UserResponse | null> {
    const user = await this.db.user.findFirst({
      where: { username },
      select: { id: true, username: true, name: true },
    });

    return user;
  }
}