import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './ormconfig';

@Module({
  imports: [TasksModule, TypeOrmModule.forRoot(ormconfig)],
})
export class AppModule {}
