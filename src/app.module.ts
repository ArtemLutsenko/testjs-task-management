import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import ormconfig from './ormconfig';

@Module({
  imports: [TasksModule, TypeOrmModule.forRoot(ormconfig), AuthModule],
})
export class AppModule {}
