import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PatientService {
  
  constructor(
     @InjectRepository(Patient)
     private patientRepository:Repository<Patient>,

     @InjectRepository(User)
     private userRepository:Repository<User>
  ){}


  async createProfile(createPatientDto: CreatePatientDto) {
    
      
      const user=await this.userRepository.findOne({where:{user_id:createPatientDto.user_id,role:'patient'}})

      if(!user){
        throw new NotFoundException("Patient Not Found")
      }

     const{phone}=createPatientDto;

      const isPatientExist=await this.patientRepository.findOne({where:{phone}});
      
      if(isPatientExist){
        throw new ConflictException("A patient with this phone number already exists'")
      }
     const patient=await this.patientRepository.create({...createPatientDto,
      user
     })

    return await this.patientRepository.save(patient);
  }

  async findAll() {
    return  await this.patientRepository.find();
  }

  async findOne(patient_id: string) {

    const patient= await this.patientRepository.findOne({where:{patient_id}})
    
    if(!patient){
      throw new  NotFoundException(`Patient not found`)
    }
    return patient;
  }

  async update(patient_id: string, updatePatientDto: UpdatePatientDto) {    
    const patient= await this.findOne(patient_id)
    const updatedPatient=Object.assign(patient,updatePatientDto);
    return await this.patientRepository.save(updatedPatient)
  }

 async  remove(patient_id: string) {

    const patient = await this.findOne(patient_id);
    await this.patientRepository.remove(patient);
    return {success:true,message:"Patient removed!"};
  }
}