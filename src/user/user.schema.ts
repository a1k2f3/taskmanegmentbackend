import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type SignupDocument = HydratedDocument<Signup>;
@Schema()
export class Signup {   
  @Prop({ required: true })
  name: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  confirmPassword: string;
  @Prop({ required: true })

  role: string;
  @Prop({ required: true })

  age: string;
  @Prop({ required: true })
  education: string;
  @Prop()
  image: string;
}
export const SignupSchema = SchemaFactory.createForClass(Signup);
