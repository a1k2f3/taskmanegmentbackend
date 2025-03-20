import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Task } from './task.schema';
import { Connection, Model } from 'mongoose';

@Injectable()
export class TaskService {
    constructor(@InjectConnection() private connection: Connection,@InjectModel(Task.name) private TaskModel: Model<Task>) {}

    async create(taskdata:Partial<Task>): Promise<Task> {
      const createdCat = new this.TaskModel(taskdata);
      return createdCat.save();
    }
  
    async findAll(): Promise<Task[]> {
      return this.TaskModel.find().exec();
    }
  

}

