import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from "./task.interface";

@Entity({ name: 'Tasks' })
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus

}
