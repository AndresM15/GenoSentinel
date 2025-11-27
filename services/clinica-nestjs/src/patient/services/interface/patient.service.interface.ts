import { CreatePatientDto } from "src/patient/dto/create-patient.dto"
import { PatientResponseDto } from "src/patient/dto/response-patient.dto"
import { UpdatePatientDto } from "src/patient/dto/update-patient.dto";
import { status } from "src/patient/entities/patient.entity";

/**
 * Definimos las funciones principales para nuestras operaciones CRUD.
 * - createPatient: Crear paciente y retorna DTO de salida
 * - findAllPatients: Consulta todos los pacientes y retorna una lista de DTOs de salida
 * - findOneByPatient: Consulta un paciente en específico y retorna el DTO de salida
 * - updatePatient: Actualiza un paciente parcialmente y retorna el DTO de salida
 * - deactivatePatient: Desactiva un paciente y retorna el estado del paciente (Ej: Follow up, Inactive)
 */

export interface IPatientService{
    createPatient(createPatientDto: CreatePatientDto): Promise<PatientResponseDto>;
    findAllPatients(): Promise<PatientResponseDto[]>;
    findOneByPatient(id: string): Promise<PatientResponseDto>;
    updatePatient(id: string, updatePatient: UpdatePatientDto): Promise<PatientResponseDto>;
    deactivatePatient(id: string): Promise<status>;
}