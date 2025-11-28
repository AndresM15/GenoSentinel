import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator"
import { cancerStage } from "../entities/clinical-record.entity"

export class UpdateClinicalRecordDto{
    @IsDateString()
    @IsOptional()
    diagnosisDate: string
    
    @IsEnum(cancerStage)
    @IsOptional()
    stage: cancerStage
    
    @IsString()
    @IsOptional()
    treatmentProtocol: string
}