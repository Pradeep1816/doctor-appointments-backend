import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppService } from './app.service';
import { join } from 'path';
import { DoctorModule } from './doctor/doctor.module';
import { Doctor } from './doctor/entities/doctor.entity';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { UserController } from './user/user.controller';
import { PatientModule } from './patient/patient.module';
import { Patient } from './patient/entities/patient.entity';
import { AvailabilityModule } from './availability/availability.module';
import { Availability } from './availability/entities/availability.entity';
import { AppointmentModule } from './appointment/appointment.module';
import { Appointment } from './appointment/entities/appointment.entity';


@Module({
  imports: [
    ConfigModule.forRoot(),
     TypeOrmModule.forRootAsync({
      imports :[ConfigModule],
      inject : [ConfigService],
      useFactory:(configService:ConfigService)=>({
          type:"postgres",
          host:configService.get('DB_HOST'),
          port:+configService.get('DB_PORT'),
          username:configService.get('DB_USERNAME'),
          password:configService.get('DB_PASSWORD'),
          database:configService.get('DB_NAME'),
          entities:[User,Doctor,Patient,Availability,Appointment],
          synchronize:true
      })
     }),
     DoctorModule,
     UserModule,
     PatientModule,
     AvailabilityModule,
     AppointmentModule,
  
  ],
  controllers: [UserController],
  providers: [AppService],
})
export class AppModule {}
