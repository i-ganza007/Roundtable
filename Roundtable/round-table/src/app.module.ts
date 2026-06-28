import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaServiceModule } from './prisma-service/prisma-service.module';

@Module({
  imports: [UsersModule, PrismaServiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
