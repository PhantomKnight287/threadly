import { Module } from '@nestjs/common';
import { ThreadService } from './thread.service';
import { ThreadController } from './thread.controller';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
  controllers: [ThreadController],
  providers: [ThreadService, PrismaService],
})
export class ThreadModule {}
