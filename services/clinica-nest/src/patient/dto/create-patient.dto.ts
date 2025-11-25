// Importamos el tipo de dato 'enum' desde el archivo patient.entity
import { gender } from "../entities/patient.entity"

// La dependencia 'class-validator' nos ayuda a validar los atributos de una clase usando decoradores.
import { IsString,IsNotEmpty,IsEnum, IsDateString } from 'class-validator';

// Esta clase nos permite crear los DTOs de entrada [Cliente --> Servidor].
export class CreatePatientDto {
    @IsString()
    @IsNotEmpty()
    first_name: string

    @IsString()
    @IsNotEmpty()
    last_name: string

    @IsDateString()
    @IsNotEmpty()
    birth_date: string

    @IsEnum(gender)
    @IsNotEmpty()
    gender: gender
}
