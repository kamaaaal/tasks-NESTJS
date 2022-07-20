//// import class validator for validating class based dto's
import { IsNotEmpty } from 'class-validator'
// using classes for creating dto's the official recomeded way
export class CreateTaskDto{
    @IsNotEmpty()
    title : string;
    @IsNotEmpty()
    description : string;
}