import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma/prisma.service';
import { CreateThread } from './dto/create-thread.dto';

@Injectable()
export class ThreadService {
  constructor(protected p: PrismaService) {}

  async createThread(data: CreateThread, creatorId: string) {
    const { attachments, content } = data;

    const thread = await this.p.thread.create({
      data: {
        content,
        attachments: {
          create: attachments,
        },
        author: {
          connect: {
            id: creatorId,
          },
        },
      },
      select: {
        id: true,
      },
    });
    return thread;
  }
  async getThread(id: string, userId: string) {
    const thread = await this.p.thread.findUnique({
      where: {
        id,
      },
      select: {
        attachments: {
          select: {
            id: true,
            type: true,
            url: true,
          },
        },
        author: {
          select: {
            username: true,
            name: true,
            profileUrl: true,
          },
        },
        content: true,
        createdAt: true,
        likes: {
          select: {
            id: true,
          },
          where: {
            authorId: userId,
          },
        },
      },
    });
    const likesCount = await this.p.like.count({
      where: {
        threadId: id,
      },
    });
    (thread as any).likesCount = likesCount;
    (thread as any).isLiked = thread.likes.length > 0;
    delete thread.likes;
    return thread;
  }

  async getThreads(userId: string, take?: string) {
    const toTake = Number.isNaN(Number(take)) ? 10 : Number(take);
    const threads = await this.p.thread.findMany({
      select: {
        id: true,
        content: true,
        createdAt: true,
        edited: true,
      },
      take: toTake,
      skip: toTake > 10 ? toTake - 10 : 0,
    });
    const response = {
      threads,
    };
    if (threads.length === 10) {
      response['next'] = toTake + 10;
    }
    return response;
  }
  async listThreads(take?: string) {
    const toTake = Number.isNaN(Number(take)) ? 10 : Number(take);
    const threads = await this.p.thread.findMany({
      select: {
        id: true,
        content: true,
        createdAt: true,
        edited: true,
        author: {
          select: {
            id: true,
            username: true,
            name: true,
            profileUrl: true,
          },
        },
      },
      take: toTake,
      skip: toTake > 10 ? toTake - 10 : 0,
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });
    const response = {
      threads,
    };
    if (threads.length === 10) {
      response['next'] = toTake + 10;
    }
    return response;
  }
}
