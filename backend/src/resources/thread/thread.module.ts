import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma/prisma.service';
import { ThreadController } from './thread.controller';
import { ThreadService } from './thread.service';

@Module({
  controllers: [ThreadController],
  providers: [ThreadService, PrismaService],
})
export class ThreadModule {}
