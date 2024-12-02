import { IsString, IsNotEmpty, IsDateString, IsInt, IsBoolean, IsArray, Matches, IsNumber, Min, Max, IsOptional } from 'class-validator';

export class AvailabilityDto  {

  @IsArray()
  @IsNotEmpty()
  day_of_week:string[];

  @IsArray()
  @IsNotEmpty()
  slot_type:string[];

  @IsOptional() 
  @IsString()
  start_time: string | null;

  @IsOptional() 
  @IsString()
  end_time: string | null;
  
  @IsNumber()
  @Min(1)
  @Max(100)
  capacity: number;

  @IsBoolean()
  isavailable:boolean;

}

export class CreateAvailabilityDto {
  @IsString()
  @IsNotEmpty()
  doctor_id: string;

  @IsNotEmpty()
  @IsArray()
  availability: AvailabilityDto[];
}