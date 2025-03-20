import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {   
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  detail: string;
  @Prop()
  file: string;
  @Prop({ required: true })
  date: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
