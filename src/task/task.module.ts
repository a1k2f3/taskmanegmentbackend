import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task,TaskSchema } from './task.schema';

@Module({
  imports: [MongooseModule.forFeatureAsync([{ name: Task.name, useFactory: () => {
    const schema = TaskSchema;
    schema.pre('save', function (next) {
      const task=this as any;
      
      if (!task.detail || task.detail.length < 10) {
        return next(new Error('Description must be at least 10 characters long.'));
      }
      const allowedStatuses = ['pending', 'in-progress', 'completed'];
      if (!allowedStatuses.includes(task.status)) {
        return next(new Error('Invalid status. Allowed values: pending, in-progress, completed.'));
      }
      if (!task.date || task.date <= new Date()) {
        return next(new Error('Due Date must be in the future.'));
      }
      console.log('Task validation passed ✅');
      next();

    });
    return schema;
  }, }])],
  providers: [TaskService],
  controllers: [TaskController],
  exports: [TaskService],
})
export class TaskModule {}
