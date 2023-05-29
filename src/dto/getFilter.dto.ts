import { TaskStatusEnum } from '../tasks/taskStatus.enum';
import { IsEnum, IsOptional, IsString } from "class-validator";

export class GetFilterDto {

  @IsOptional()
  @IsEnum(TaskStatusEnum)
  readonly status?: TaskStatusEnum;


  @IsOptional()
  @IsString()
  search?: string;
}
