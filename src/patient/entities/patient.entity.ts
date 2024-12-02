import { Appointment } from 'src/appointment/entities/appointment.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn } from 'typeorm';


@Entity({ name: 'patients' })
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  patient_id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;
  
  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'enum', enum: ['Male', 'Female', 'Other'] })
  gender: string;

  @Column({type :'varchar', length:200})
  address: string;

  @Column({ type: 'float' })
  weight: number;

  @Column({ type: 'varchar', length: 15 })
  phone: string;

  @OneToOne(()=>User,(user)=>user.patient)
  @JoinColumn({name:'user_id'})
  user:User

  @OneToMany(()=>Appointment,(appointment)=>appointment.patient)
  appointments:Appointment[]
}