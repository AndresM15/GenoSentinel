// La dependencia 'class-validator' nos ayuda a validar los atributos de una clase usando decoradores.
import {IsString,IsNotEmpty,IsEnum, isEnum} from 'class-validator';

export enum gender{
    MALE = "Male",
    FEMALE = 'Female',
    OTHER = 'Other'
}

export enum status{
  ACTIVE = 'Active',
  FOLLOW_UP = 'Follow Up',
  INACTIVE = 'Inactive'
}

// En los decoradoes agregamos las validaciones de cada atributo
export class CreatePatientDto {
    @IsString()
    @IsNotEmpty()
    first_name: string

    @IsString()
    @IsNotEmpty()
    last_name: string

    @IsString()
    @IsNotEmpty()
    birth_date: string

    @IsEnum(gender)
    gender: gender

    @IsEnum(status)
    status: status
}
