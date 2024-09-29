import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { User } from 'src/database/core/user.entity';
import { Get, Post, Body, Put, Param, Delete } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  async findAllUser(): Promise<User[]> {
    const users = await this.userService.findAll();
    return users;
  }

  @Get('/:id')
  async findOneUser(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findOne(id);
    return user;
  }

  @Post('/')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<CreateUserDto>,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteById(id);
  }
}
