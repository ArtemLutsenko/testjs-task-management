import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { hash } from 'bcrypt'
import { TaskEntity } from "../tasks/task.entity";

@Entity({name: 'users'})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({unique: true})
  username: string

  @Column({select: false})
  password: string

  @OneToMany(type => TaskEntity, task => task.user)
  tasks: TaskEntity[]

  @BeforeInsert()
  async hashPassword(){
    this.password = await hash(this.password, 10)
  }
}
