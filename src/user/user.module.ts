import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Signup, SignupSchema } from './user.schema';
@Module({
  imports: [MongooseModule.forFeatureAsync([{ name: Signup.name,  useFactory
    : () => {
    const schema = SignupSchema;
    schema.pre('save', function (next) {
      const user=this as any;
      if(!user.name){
        return next(new Error('Title must be at least 3 characters long.'));
      }
      if (!user.email ) {
        return next(new Error('Description must be at least 10 characters long.'));
      }
      if (!user.password||user.password<3) {
        return next(new Error('password must be at least 3 characters long.'));
      }
      if (user.confirmPassword!==user.password) {
        return next(new Error('password must be equal to passsword'));
      }    
      if (!user.role) {
        return next(new Error('role must be required'));
      }
      if (!user.age||user.age<18) {
        return next(new Error('age must be required and greater than 18'));
      }
      if (!user.education) {
        return next(new Error('age must be required and greater than 18'));
      }
      console.log('Task validation passed ');
      next();
    });
    return schema;
  } }])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
