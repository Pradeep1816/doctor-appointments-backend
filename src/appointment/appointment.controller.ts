import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { query } from 'express';

@Controller('api.schedula.in/v1/appointment/')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post('create-appointment')
  create(@Body() createAppointmentDto: CreateAppointmentDto) {

    console.log(createAppointmentDto)
    return this.appointmentService.createAppointment(createAppointmentDto);
  }

  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(id);
  }

 @Get("get-booked-slots/:doctor_id")
 async getBookedSlots(@Param('doctor_id') doctor_id:string, @Query('date') date:string){
         return await this.appointmentService.getBookedSlots(doctor_id)
 }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const appointment= this.appointmentService.remove(id);
    return {success:true, message:"Your appointment removed!", appointment}
  }
}