import { Doctor } from "src/doctor/entities/doctor.entity";
import { Patient } from "src/patient/entities/patient.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'users'})
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id:string

  @Column ({unique:true})
  email:string;

  
  @Column({ type: 'enum', enum: ['doctor', 'patient'], default: 'patient' })
  role: 'patient' | 'doctor'

  @Column()
  password:string;

  @CreateDateColumn({type: 'timestamp'})
  createdAt:Date;
  
  @OneToOne(()=>Doctor,(doctor)=>doctor.user)
  doctor:Doctor;

  @OneToOne(()=>Patient,(patient)=>patient.user)
  patient:Patient;

}