import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { User } from 'src/user/entities/user.entity';
import { Patient } from 'src/patient/entities/patient.entity';

@Injectable()
export class AppointmentService {
 
  constructor(
      @InjectRepository(Appointment)
       private  appointmentRepository:Repository<Appointment>,
      
       @InjectRepository(Doctor)
       private  doctorRepository:Repository<Doctor>,

       @InjectRepository(Patient)
       private  patientRepository:Repository<Patient>,
  ){}
   

 async createAppointment(createAppointmentDto: CreateAppointmentDto) {
     
  const {doctor_id,user_id}=createAppointmentDto;
    
    const doctor=await this.doctorRepository.findOne({where:{doctor_id}})

    if(!doctor){
         throw new Error("Doctor Not Found")
    }

  const patient=await this.patientRepository.findOne({where:{user:{user_id}},
    relations:['user']
  })

  console.log(patient)

   if(!patient){
    throw new Error("Patient not found")
   }

    const appointment= this.appointmentRepository.create(
      {
        ...createAppointmentDto,
        doctor,
        patient
      }
    )
    


    return this.appointmentRepository.save(appointment);
  }

  findAll() {
    return `This action returns all appointment`;
  }

  async findOne(doctor_id: string) {
    const doctor=await this.doctorRepository.findOne({where:{doctor_id}})
    
    return doctor;
  }


  async getBookedSlots(doctor_id:string){
       const appointment=await this.appointmentRepository.find({
         where:{doctor:{doctor_id}},
         select:['appointment_time']
       })

       return appointment;
  }

  async update(appointment_id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment=await this.appointmentRepository.findOne({where:{appointment_id}})

    if(!appointment){
      throw new NotFoundException("Appointment not found")
    }

    if(updateAppointmentDto.doctor_id){
       const doctor=await this.doctorRepository.findOne({where:{doctor_id:updateAppointmentDto.doctor_id}});
       if(!doctor){
        throw new NotFoundException("Doctor not found")
       }
       appointment.doctor=doctor
    }

    if(updateAppointmentDto.user_id){
      const patient=await this.patientRepository.findOne({
        where:{patient_id:updateAppointmentDto.user_id}
      });

      if(!patient){
        throw new NotFoundException("Patient not found")
      }
      appointment.patient=patient;
    }

    const   updateAppointment=Object.assign(appointment,updateAppointmentDto);

    return this.appointmentRepository.save(updateAppointment);

   
  }

  async remove(appointment_id: string) {

    const appointment=await this.appointmentRepository.findOne({where:{appointment_id}});

    if(!appointment){
      throw new NotFoundException("Your appointment not found")
    }
    return this.appointmentRepository.remove(appointment)
  }
}