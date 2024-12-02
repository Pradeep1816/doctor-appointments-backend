import { IsNotEmpty, IsString, IsNumber, IsEnum, Min, Max } from 'class-validator';

export class CreatePatientDto {
 
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsString()
  address:string 

  @IsEnum(['Male', 'Female', 'Other'], { message: 'Sex must be Male, Female, or Other' })
  gender: string;

  @IsNumber()
  weight: number;
  
  @IsString()
  phone:string

  @IsString()
  user_id:string

}