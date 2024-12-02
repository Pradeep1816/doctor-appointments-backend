import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity({name:"appointments"})
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  appointment_id: string;

  @Column()
  appointment_date: string;

  @Column()
  appointment_time: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
  @JoinColumn({name:"doctor_id"})
  doctor: Doctor;

  @ManyToOne(() => Patient, (patient) => patient.appointments)
  @JoinColumn({name:"patient_id"})
  patient: Patient;
}