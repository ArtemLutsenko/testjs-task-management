import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatusEnum } from "./taskStatus.enum";

@Entity({ name: 'Tasks' })
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({default: TaskStatusEnum.OPEN})
  status: TaskStatusEnum

}
