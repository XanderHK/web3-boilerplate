import { RootController } from './app.controller';
import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { dbConnect } from './db/db';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  controllers: [RootController],
  imports: [dbConnect(), ScheduleModule.forRoot(), ApiModule],
})
export class RootModule { }
