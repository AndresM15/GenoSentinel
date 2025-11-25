// Importamos el tipo de dato "enum" desde la clase patient.entity
import { status , gender } from "../entities/patient.entity"

// Esta clase son los DTOs de salida, las que se le envía del [servidor --> cliente]
export class PatientResponseDto{
    id: string
    first_name: string
    last_name: string
    birth_date: string
    gender: gender
    status: status
}