import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports:[TypeOrmModule.forFeature([Doctor,User])],
  controllers: [DoctorController],
  providers: [DoctorService],
  exports:[DoctorService]
})
export class DoctorModule {}
