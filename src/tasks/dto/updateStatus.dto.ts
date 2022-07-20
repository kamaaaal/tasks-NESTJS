import { IsEnum, IsUUID } from "class-validator";
import { StatusType } from "../tasks-status.enum";

export class UpdateTaskParamDto{
    @IsUUID()
    id : string;
}
export class UpdateTaskDto{
    @IsEnum(StatusType)
    status : string;
}