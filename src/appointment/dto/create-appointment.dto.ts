import { IsDateString, IsString, IsNumber } from 'class-validator';

export class CreateAppointmentDto {
  @IsDateString()
  appointment_date: string;

  @IsString()
  appointment_time: string;

  @IsString()
  doctor_id: string; 

  @IsString()
  user_id: string; 
}