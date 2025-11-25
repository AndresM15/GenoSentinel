import { gender } from "../entities/patient.entity"

// La dependencia 'class-validator' nos ayuda a validar los atributos de una clase usando decoradores.
import { IsOptional , IsString, IsDateString, IsEnum} from "class-validator"

// Actualizamos los DTOs de entrada [Cliente --> Servidor] en caso de que el usuario desea modificar un paciente.
export class UpdatePatientDto{
    @IsOptional() // El usuario no tiene la obligación de enviar los datos
    @IsString()
    first_name: string

    @IsOptional()
    @IsString()
    last_name: string

    @IsDateString()
    @IsOptional()
    birth_date: string

    @IsEnum(gender)
    @IsOptional()
    gender: gender
}
