import { ConflictException, Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class DoctorService {
  
  constructor(
     @InjectRepository(Doctor)
     private doctorRepository:Repository<Doctor>,

     @InjectRepository(User)
     private userRepository:Repository<User>
  ){}

  async createDoctor(createDoctorDto: CreateDoctorDto) {
        
    const user=await this.userRepository.findOne({where:{user_id:createDoctorDto.user_id,role:'doctor'}})
    
    if(!user){
      throw new Error('User not found');
    }

    const  {email,phone}=createDoctorDto;
       
    const isDoctor=await this.doctorRepository.findOne({where:[{email},{phone}]});

    if(isDoctor){
       throw  new ConflictException("A Doctor with this email or phone number already exists")
    }

       const doctor=await this.doctorRepository.create({...createDoctorDto,
        user
       });

        return await this.doctorRepository.save(doctor);
  }

  async findAll() {
    return await this.doctorRepository.find();
  }

  async findOne(doctor_id: string) {
    return await this.doctorRepository.findOne({where:{doctor_id},
    relations:['user']});
  }

 

  async update(doctor_id: string, updateDoctorDto: UpdateDoctorDto) {

    const doctor= await this.findOne(doctor_id)

    const updateDoctor=Object.assign(doctor,updateDoctorDto)
    return await this.doctorRepository.save(updateDoctor);
  }

  async remove(id: string) {
    const doctor=await this.findOne(id)
     await this.doctorRepository.remove(doctor)
    return {success:true,message:"Doctor removed!"}
  }
}