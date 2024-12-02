import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Availability } from './entities/availability.entity';
import { Repository } from 'typeorm';
import { Doctor } from 'src/doctor/entities/doctor.entity';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(Availability)
    private readonly availabilityRepository: Repository<Availability>,

    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {}

  async createAvailability(createAvailabilityDto: CreateAvailabilityDto) {
    const { doctor_id, availability } = createAvailabilityDto;

    const doctor = await this.doctorRepository.findOne({
      where: { doctor_id },
    });

    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${doctor_id} not found`);
    }

    const availabilities = createAvailabilityDto.availability.map((availability) => {
      const { start_time, end_time, ...rest } = availability;
  
      return this.availabilityRepository.create({
        ...rest,
        start_time: start_time === '' ? null : start_time,
        end_time: end_time === '' ? null : end_time,
        doctor,
      });
    });

    await this.availabilityRepository.save(availabilities);

    return { message: 'Availability created successfully', availability: availabilities };
  }

  async findAll() {
    return await this.availabilityRepository.find({ relations: ['doctor'] });
  }

  async findDoctor(doctor_id: string) {
    const availability = await this.availabilityRepository.find({
      where: { doctor: { doctor_id } },
      relations: ['doctor'],
    });

    if (!availability || availability.length === 0) {
      throw new NotFoundException(`No availability found`);
    }

    return availability;
  }

  async update(availability_id: string, updateAvailabilityDto: UpdateAvailabilityDto) {
    const availability = await this.availabilityRepository.findOne({
      where: { availability_id },
      relations: ['doctor'],
    });

    if (!availability) {
      throw new NotFoundException(`Availability with ID ${availability_id} not found`);
    }
     
    const updatedAvailability=Object.assign(availability,updateAvailabilityDto)


    return await this.availabilityRepository.save(updatedAvailability);
  }

  async remove(availability_id: string) {
    const availability = await this.availabilityRepository.findOne({
      where: { availability_id },
    });

    if (!availability) {
      throw new NotFoundException(`Availability not found`);
    }

    await this.availabilityRepository.remove(availability);

    return { message: `Availability has been removed` };
  }
}
