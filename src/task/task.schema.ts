import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import  {Signup} from'../user/user.schema';
export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {   
  @Prop()
  title: string;

  @Prop({ required: true })
  detail: string;
  @Prop()
  file: string;
  @Prop()
  submissionfile: string;
  @Prop()
  status: string;
  @Prop({ required: true })
  date: Date;
  
@Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Signup' } })
// This ensures the field is not confused with a populated reference
user: Signup;

}

export const TaskSchema = SchemaFactory.createForClass(Task);
