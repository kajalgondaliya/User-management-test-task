import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  Max,
  IsOptional,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
    minLength: 3,
    maxLength: 50,
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'tZBtD@example.com',
    required: true,
    type: String,
    uniqueItems: true,
    format: 'email',
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
  })
  @IsNotEmpty()
  @IsEmail(
    {},
    {
      message: 'Please enter a valid email address',
    },
  )
  email: string;

  @ApiProperty({
    description: 'The age of the user',
    example: 25,
    required: true,
    type: Number,
    minimum: 0,
    maximum: 120,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(120)
  age: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
    minLength: 3,
    maxLength: 50,
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  @Length(3, 50)
  name?: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
    required: false,
    type: String,
    uniqueItems: true,
    format: 'email',
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
  })
  @IsOptional()
  @IsEmail({}, {
    message: 'Please enter a valid email address',
  })
  email?: string;

  @ApiProperty({
    description: 'The age of the user',
    example: 30,
    required: false,
    type: Number,
    minimum: 0,
    maximum: 120,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(120)
  age?: number;
}
