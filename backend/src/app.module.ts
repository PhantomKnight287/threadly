import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './resources/auth/auth.module';
import { UserMiddleware } from './resources/auth/middleware/user.middleware';
import { ThreadModule } from './resources/thread/thread.module';
import { PrismaService } from './services/prisma/prisma.service';

@Module({
  imports: [AuthModule, ThreadModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .exclude({
        method: RequestMethod.POST,
        path: 'auth/(.*)',
      })
      .forRoutes('*');
  }
}
