import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
   
  @PrimaryGeneratedColumn('uuid')
  user_id:string
  

  @IsEmail()
  @IsNotEmpty()
  
  email: string;
  @IsString()
  password: string;

  @IsEnum(['patient','doctor'],{message:`Role must be either "Doctor" or "Patient"`})
  role: 'patient'| 'doctor';

}