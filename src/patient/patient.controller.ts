import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Controller('api.schedula.in/v1')
export class PatientController {
  
  constructor(private readonly patientService: PatientService) {}

  @Post('/patient-profile')
 async  create(@Body() createPatientDto: CreatePatientDto) {
    
     
    try {
      const patient =await this.patientService.createProfile(createPatientDto);
      return {
        message: 'Patient profile created successfully',
        patient,
      };
    } catch (error) {
       if(error instanceof ConflictException){
        throw new ConflictException(error.message)
       }

       throw error;
    }
   
  }

  @Get('/patient-list')
  findAll() {
    return this.patientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') patient_id: string) {
    return this.patientService.findOne(patient_id);
  }

  @Patch('patient/:id')
  update(@Param('id') patient_id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(patient_id, updatePatientDto);
  }

  @Delete('patient/:id')
  remove(@Param('id') patient_id: string) {
    return this.patientService.remove(patient_id);
  }
}