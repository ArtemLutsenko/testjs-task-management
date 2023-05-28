import { TaskStatus } from '../tasks/task.interface';
import { IsEnum, IsOptional, IsString } from "class-validator";

export class GetFilterDto {

  @IsOptional()
  @IsEnum(TaskStatus)
  readonly status?: TaskStatus;


  @IsOptional()
  @IsString()
  search?: string;
}
