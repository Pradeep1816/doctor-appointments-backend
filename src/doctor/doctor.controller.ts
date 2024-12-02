import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Controller('/api.schedula.in/v1')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post('/doctor-profile')
  async create(@Body() createDoctorDto: CreateDoctorDto) {
    
       try {
        const doctor=await this.doctorService.createDoctor(createDoctorDto);

        return {
           message:"your file is created successfully",
           data:doctor
        }
       } catch (error) {
          
        if(error instanceof ConflictException){
          throw new ConflictException(error.message)
        }
        throw error
       }

  }

  @Get('/doctor-list')
  findAll() {
    return this.doctorService.findAll();
  }

  @Get('/doctor/:id')
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(id);
  }

  @Patch('doctor/:id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(id, updateDoctorDto);
  }

  @Delete('doctor/:id')
  remove(@Param('id') id: string) {
    return this.doctorService.remove(id);
  }
}