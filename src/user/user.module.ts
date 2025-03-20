import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Sign } from 'crypto';
import { Signup } from './user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Sign.name, schema: Signup }])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
