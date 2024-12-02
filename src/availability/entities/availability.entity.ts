import { Doctor } from "src/doctor/entities/doctor.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"availabilities"})
export class Availability {

  @PrimaryGeneratedColumn('uuid')
  availability_id:string;

  @Column('simple-array')
  day_of_week:string[];

  @Column('simple-array')
  time_slots:string[];

  @Column({ type: 'time', nullable: true }) 
  start_time: string | null;

  @Column({ type: 'time', nullable: true }) 
  end_time: string | null;

  @Column({type:'int'})
  capacity:number

  @Column({default:true})
  isavailable:boolean

  @CreateDateColumn()
  created_at:Date
  
  @ManyToOne(()=> Doctor,(doctor)=> doctor.availabilities)
  @JoinColumn({name:"doctor_id"})
  doctor:Doctor
}