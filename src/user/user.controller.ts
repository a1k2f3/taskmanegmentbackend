import { Controller, Post, Body, Get, Param, Patch, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { Signup } from './user.schema';
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post()
    async create(@Body() userData: Partial<Signup>): Promise<Signup> {
        try {
            return await this.userService.create(userData);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
    @Get()
    async findAll(): Promise<Signup[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') userId: string): Promise<Signup> {
        const user = await this.userService.findById(userId);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    @Patch(':id')
    async update(@Param('id') userId: string, @Body() updateData: Partial<Signup>): Promise<Signup> {
        const updatedUser = await this.userService.update(userId, updateData);
        if (!updatedUser) {
            throw new HttpException('User not found or update failed', HttpStatus.NOT_FOUND);
        }
        return updatedUser;
    }

    @Delete(':id')
    async delete(@Param('id') userId: string): Promise<{ deleted: boolean }> {
        const result = await this.userService.delete(userId);
        if (!result.deleted) {
            throw new HttpException('User not found or deletion failed', HttpStatus.NOT_FOUND);
        }
        return result;
    }
}
