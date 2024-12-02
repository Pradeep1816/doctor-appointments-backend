import { Appointment } from 'src/appointment/entities/appointment.entity';
import { Availability } from 'src/availability/entities/availability.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';

@Entity({name:'doctors'})
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  doctor_id: string;

  @Column()
  name: string;

  @Column()
  specialty: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  location: string;

  @Column()
  experience:string

  @Column({
     name:'schedule_type',
     type:'enum',
     enum:['Stream', 'Wave'],
     
  })
  schedule_type: 'Stream' | 'Wave'
  
  @OneToOne(()=>User,(user)=>user.doctor)
  @JoinColumn({name:"user_id"})
  user:User
  
  @OneToMany(()=>Availability,(availability)=>availability.doctor)
  availabilities:Availability[]

  @OneToMany(()=>Appointment,(appointment)=>appointment.doctor)
  appointments:Appointment[]
}