import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(protected p: PrismaService) {}

  async getProfile(username: string) {
    const user = await this.p.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        name: true,
        username: true,
        profileUrl: true,
        bio: true,
      },
    });
    return user;
  }
}
