import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>){}

  async createUser(createUserDto: CreateUserDto) {
  
   
   const isExist=await this.userRepository.findOne({where :{email:createUserDto.email}})

   if(isExist){
    throw new HttpException(
      { success: true, message: "User with this email already exists" },
      HttpStatus.BAD_REQUEST
    );
   }

   const hashPassword =await bcrypt.hash(createUserDto.password,+process.env.SALT)

  

    const newUser=this.userRepository.create(
      { ...createUserDto,
       password:hashPassword}
    );
    return await this.userRepository.save(newUser)
  }

  
  async findByEmail(email:string):Promise<User| undefined>{
    return await this.userRepository.findOne({where:{email}});
  }


  // Get all Users List
  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(user_id: string) {

    const user=await this.userRepository.findOne({where:{user_id},
      relations:['doctor']
    })

    if(!user){
      throw new NotFoundException("User not found");
    }
    return user;
  }

  async update(user_id: string, updateUserDto: UpdateUserDto) {
    const user=await this.findOne(user_id);

    if(updateUserDto.password){
       updateUserDto.password=await bcrypt.hash(updateUserDto.password,+process.env.SALT)
    }
    const updateUser=Object.assign(user,updateUserDto)
    return await this.userRepository.save(updateUser);
  }

  async remove(user_id: string) {
     const user=await this.findOne(user_id);
     return this.userRepository.remove(user);
  }
}