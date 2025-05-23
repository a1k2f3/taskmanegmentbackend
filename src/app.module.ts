import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [TaskModule, UserModule,
    MongooseModule.forRoot('mongodb://localhost/nest'),
    TaskModule,UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
