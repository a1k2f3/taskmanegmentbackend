import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import  {Task} from './task.schema';
import { Connection, Model } from 'mongoose';
@Injectable()
export class TaskService {
    constructor(@InjectConnection() private connection: Connection,@InjectModel(Task.name) private TaskModel: Model<Task>) {}

    async create(taskData: Partial<Task>): Promise<Task> {
       
        try {
            const createdTask = new this.TaskModel(taskData);
            const savedTask = await createdTask.save(); 
           
            return savedTask;
        } catch (error) {
          // ❌ Rollback on error
            throw error; 
                }    
        
    }
    
    async update(taskId: string, updateData: Partial<Task>): Promise<Task | null> {
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            const updatedTask = await this.TaskModel.findByIdAndUpdate(taskId, updateData, { new: true, session }).exec();
            await session.commitTransaction(); // ✅ Commit transaction if successful
            return updatedTask;
        } catch (error) {
            await session.abortTransaction(); // ❌ Rollback on error
            throw error; // ✅ Rethrow the error for better error handling
        } finally {
            session.endSession(); // ✅ Always close session
        }
    }
    
    async delete(taskId: string): Promise<{ deleted: boolean }> {
        const result = await this.TaskModel.deleteOne({ _id: taskId }).exec();
        return { deleted: result.deletedCount > 0 };
    }

    async findAll(): Promise<Task[]> {
      return this.TaskModel.find().exec();
    }
}

