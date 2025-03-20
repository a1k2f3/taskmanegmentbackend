import { Controller, Post, Body, Put, Param, Delete, Get } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.schema';

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    async create(@Body() taskData: Partial<Task>): Promise<Task> {
        return this.taskService.create(taskData);
    }

    @Put(':id')
    async update(@Param('id') taskId: string, @Body() updateData: Partial<Task>): Promise<Task | null> {
        return this.taskService.update(taskId, updateData);
    }

    @Delete(':id')
    async delete(@Param('id') taskId: string): Promise<{ deleted: boolean }> {
        return this.taskService.delete(taskId);
    }

    @Get()
    async findAll(): Promise<Task[]> {
        return this.taskService.findAll();
    }
}
