import { IsString, MinLength } from "class-validator";

export class AuthCredentialsDto{
    @IsString()
    username : string;

    @IsString()
    @MinLength(8,{message : "Password must be larger that 8 chars"})
    password : string;
}