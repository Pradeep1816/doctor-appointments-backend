import { IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  name: string;

  @IsString()
  specialty: string;

  @IsPhoneNumber(null) // Validate phone number format
  phone: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsString()
  experience: string;

  @IsEnum(['Stream', 'Wave'], { message: 'scheduleType must be either "stream" or "wave"' })
  schedule_type: 'Stream' | 'Wave';
 
  @IsString()
  user_id:string
  
}