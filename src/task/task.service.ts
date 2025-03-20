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
    async update(taskId: string, updateData: Partial<Task>): Promise<Task | null> {
        return this.TaskModel.findByIdAndUpdate(taskId, updateData, { new: true }).exec();
    }
    async delete(taskId: string): Promise<{ deleted: boolean }> {
        const result = await this.TaskModel.deleteOne({ _id: taskId }).exec();
        return { deleted: result.deletedCount > 0 };
    }
    
    async findAll(): Promise<Task[]> {
      return this.TaskModel.find().exec();
    }
}

