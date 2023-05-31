import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatusEnum } from "./taskStatus.enum";
import { UserEntity } from "../auth/user.entity";
import { Exclude } from "class-transformer";

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

  @ManyToOne(()=> UserEntity, user => user.tasks, {eager: true})
  @Exclude({toPlainOnly: true})
  user: UserEntity

}
