import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('api.schedula.in/v1/auth/')
export class UserController {
  constructor(
    private readonly userService: UserService) {}

  @Post('/sign-up')
  async signUp(@Body() createUserDto: CreateUserDto) :Promise<User> {
         console.log(createUserDto)
    return this.userService.createUser(createUserDto)
  }

  @Get("")
 findAll() {
    return  this.userService.findAll()
  }

  @Get('user/:id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}