import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BodyWithUser } from '../../types/body';
import { CreateThread } from './dto/create-thread.dto';
import { ThreadService } from './thread.service';

@Controller('threads')
export class ThreadController {
  constructor(private readonly service: ThreadService) {}

  @Post()
  async createThread(@Body() body: CreateThread) {
    const { user, ...rest } = body as unknown as BodyWithUser<CreateThread>;
    return await this.service.createThread(rest, user.id);
  }
  @Get(':id')
  async getThread(@Param('id') id: string, @Body() body) {
    const { user } = body as unknown as BodyWithUser<unknown>;
    return await this.service.getThread(id, user.id);
  }
  @Get('user/:id')
  async getThreadsByUser(@Param('id') id: string) {
    return await this.service.getThreads(id);
  }
  @Get()
  async getThreads(@Query('take') take?: string) {
    return await this.service.listThreads(take);
  }
}
