import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Signup } from './user.schema';
import { Connection, Model } from 'mongoose';
import { Sign } from 'crypto';

@Injectable()
export class UserService {
    constructor(
        @InjectConnection() private readonly connection: Connection,
        @InjectModel(Signup.name) private readonly userModel: Model<Signup>,
    ) {}

    async create(userData: Partial<Signup>): Promise<Signup> {
        
        try {
            const createdUser = new this.userModel(userData);
            const savedUser = await createdUser.save();
            return savedUser;
        } catch (error) {
            
            throw error;
        } 
    }

    async update(userId: string, updateData: Partial<Signup>): Promise<Signup | null> {
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            const updatedUser = await this.userModel.findByIdAndUpdate(userId, updateData, { new: true, session }).exec();
            await session.commitTransaction();
            return updatedUser;
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    async delete(userId: string): Promise<{ deleted: boolean }> {
        const result = await this.userModel.deleteOne({ _id: userId }).exec();
        return { deleted: result.deletedCount > 0 };
    }

    async findAll(): Promise<Signup[]> {
        return this.userModel.find().exec();
    }

    async findById(userId: string): Promise<Signup | null> {
        return this.userModel.findById(userId).exec();
    }
}
