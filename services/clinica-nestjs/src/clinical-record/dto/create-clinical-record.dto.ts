import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";
import { cancerStage } from "../entities/clinical-record.entity";

/**
 * DTO para crear un nuevo registro clínico.
 *
 * Este DTO define los datos que el cliente debe enviar para registrar
 * un diagnóstico clínico de un paciente.
 * 
 */

export class CreateClinicalRecordDto {
    @IsNotEmpty()
    @IsUUID()
    patientId: string

    @IsNotEmpty()
    @IsNumber()
    tumorTypeId: number

    @IsDateString()
    @IsNotEmpty()
    diagnos_is_Date: string

    @IsEnum(cancerStage)
    @IsNotEmpty()
    stage: cancerStage

    @IsString()
    @IsNotEmpty()
    treatmentProtocol: string
}