import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, Types } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { User, UserDocument } from '../schema/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec();
    if (existingUser) {
      throw new ConflictException(
        `User with email ${createUserDto.email} already exists`,
      );
    }

    try {
      const createdUser = new this.userModel(createUserDto);
      return await createdUser.save();
    } catch (error: any) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `User with email ${createUserDto.email} already exists`,
        );
      }
      throw new InternalServerErrorException(
        `Error creating user: ${error.message}`,
      );
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }

    const user = await this.userModel
      .findById(id, {
        name: 1,
        email: 1,
        age: 1,
        createdAt: 1,
        updatedAt: 1,
      })
      .exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }

    const existingUser = await this.userModel
      .findOne({ email: updateUserDto.email })
      .exec();
    if (
      existingUser &&
      (existingUser._id as Types.ObjectId).toString() !== id
    ) {
      throw new ConflictException(
        `User with email ${updateUserDto.email} already exists`,
      );
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
