import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './services/user.services';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new user',
    description:
      'Creates a new user with the provided information. All fields are required.',
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'User data to create a new user',
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    schema: {
      example: {
        _id: '64f8b2c3d4e5f6a7b8c9d0e1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        age: 30,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid input data or validation errors',
    schema: {
      example: {
        statusCode: 400,
        message: [
          'name must be longer than or equal to 3 characters',
          'email must be a valid email',
          'age must be a number conforming to the specified constraints',
        ],
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict - Email already exists',
    schema: {
      example: {
        statusCode: 409,
        message: 'Email already exists',
        error: 'Conflict',
      },
    },
  })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return {
      success: true,
      message: 'User created successfully',
      data: user,
    };
  }
  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Retrieves a list of all users in the system',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all users retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            example: '64f8b2c3d4e5f6a7b8c9d0e1',
          },
          name: {
            type: 'string',
            example: 'John Doe',
          },
          email: {
            type: 'string',
            example: 'john.doe@example.com',
          },
          age: {
            type: 'number',
            example: 30,
          },
        },
      },
      example: [
        {
          _id: '64f8b2c3d4e5f6a7b8c9d0e1',
          name: 'John Doe',
          email: 'john.doe@example.com',
          age: 30,
        },
        {
          _id: '64f8b2c3d4e5f6a7b8c9d0e2',
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          age: 25,
        },
      ],
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    schema: {
      example: {
        statusCode: 500,
        message: 'Internal server error',
        error: 'Internal Server Error',
      },
    },
  })
  async findAll() {
    const users = await this.usersService.findAll();
    return {
      success: true,
      message: 'Users retrieved successfully',
      data: users,
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a user by ID',
    description: 'Retrieves a single user by their unique identifier',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the user (MongoDB ObjectId)',
    example: '64f8b2c3d4e5f6a7b8c9d0e1',
    type: 'string',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'User found and retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        _id: {
          type: 'string',
          example: '64f8b2c3d4e5f6a7b8c9d0e1',
        },
        name: {
          type: 'string',
          example: 'John Doe',
        },
        email: {
          type: 'string',
          example: 'john.doe@example.com',
        },
        age: {
          type: 'number',
          example: 30,
        },
      },
      example: {
        _id: '64f8b2c3d4e5f6a7b8c9d0e1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        age: 30,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid ID format',
    schema: {
      example: {
        statusCode: 400,
        message: 'Invalid ID format',
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'User not found',
        error: 'Not Found',
      },
    },
  })
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return {
      success: true,
      message: 'User retrieved successfully',
      data: user,
    };
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a user',
    description:
      'Updates a user with the provided information. All fields are optional (partial update).',
  })
  @ApiParam({
    name: 'id',
    description:
      'The unique identifier of the user to update (MongoDB ObjectId)',
    example: '64f8b2c3d4e5f6a7b8c9d0e1',
    type: 'string',
    required: true,
  })
  @ApiBody({
    type: UpdateUserDto,
    description:
      'User data to update. Only provide fields that need to be updated.',
    examples: {
      'Update Name Only': {
        value: {
          name: 'Jane Doe',
        },
      },
      'Update Email and Age': {
        value: {
          email: 'jane.doe@example.com',
          age: 32,
        },
      },
      'Update All Fields': {
        value: {
          name: 'Jane Doe',
          email: 'jane.doe@example.com',
          age: 32,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    schema: {
      example: {
        _id: '64f8b2c3d4e5f6a7b8c9d0e1',
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        age: 32,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid input data or ID format',
    schema: {
      example: {
        statusCode: 400,
        message: [
          'name must be longer than or equal to 3 characters',
          'email must be a valid email',
        ],
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'User not found',
        error: 'Not Found',
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict - Email already exists',
    schema: {
      example: {
        statusCode: 409,
        message: 'Email already exists',
        error: 'Conflict',
      },
    },
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto);
    return {
      success: true,
      message: 'User updated successfully',
      data: user,
    };
  }
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete a user',
    description:
      'Permanently deletes a user from the system by their unique identifier',
  })
  @ApiParam({
    name: 'id',
    description:
      'The unique identifier of the user to delete (MongoDB ObjectId)',
    example: '64f8b2c3d4e5f6a7b8c9d0e1',
    type: 'string',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'User deleted successfully',
        },
        deletedUser: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '64f8b2c3d4e5f6a7b8c9d0e1',
            },
            name: {
              type: 'string',
              example: 'John Doe',
            },
            email: {
              type: 'string',
              example: 'john.doe@example.com',
            },
            age: {
              type: 'number',
              example: 30,
            },
          },
        },
      },
      example: {
        message: 'User deleted successfully',
        deletedUser: {
          _id: '64f8b2c3d4e5f6a7b8c9d0e1',
          name: 'John Doe',
          email: 'john.doe@example.com',
          age: 30,
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid ID format',
    schema: {
      example: {
        statusCode: 400,
        message: 'Invalid ID format',
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'User not found',
        error: 'Not Found',
      },
    },
  })
  async remove(@Param('id') id: string) {
    if (!id) {
      return {
        success: false,
        message: 'User ID is required',
      };
    }
    await this.usersService.remove(id);
    return {
      success: true,
      message: 'User deleted successfully',
    };
  }
}
