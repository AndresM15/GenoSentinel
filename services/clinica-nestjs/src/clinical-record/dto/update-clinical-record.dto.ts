import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator"
import { cancerStage } from "../entities/clinical-record.entity"

/**
 * DTO para actualizar parcialmente un registro clínico.
 *
 * Este DTO permite modificar solo algunos campos de un registro existente.
 * Todos los campos son opcionales, ya que el PATCH no requiere enviar todo.
 * 
 */

export class UpdateClinicalRecordDto{
    @IsDateString()
    @IsOptional()
    diagnos_is_Date: string
    
    @IsEnum(cancerStage)
    @IsOptional()
    stage: cancerStage
    
    @IsString()
    @IsOptional()
    treatmentProtocol: string
}