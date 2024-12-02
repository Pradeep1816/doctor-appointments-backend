import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Patient } from 'src/patient/entities/patient.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Appointment,Doctor,Patient])],
  controllers: [AppointmentController],
  providers: [AppointmentService],
  exports:[AppointmentService]
})
export class AppointmentModule {}
