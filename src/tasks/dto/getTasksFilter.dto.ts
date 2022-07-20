import { IsEnum, IsOptional } from "class-validator";
import { StatusType } from "../tasks-status.enum";

export class GetTaskFilterDto{
    @IsEnum(StatusType) 
    @IsOptional()
    status ?: string;

    search ?: string;

}