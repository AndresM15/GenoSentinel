import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";
import { cancerStage } from "../entities/clinical-record.entity";

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