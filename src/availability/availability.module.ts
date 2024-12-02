import { Module } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { AvailabilityController } from './availability.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Availability } from './entities/availability.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Availability,Doctor])],
  controllers: [AvailabilityController],
  providers: [AvailabilityService],
  exports:[AvailabilityService]
})
export class AvailabilityModule {}
