import { cancerStage } from "../entities/clinical-record.entity"

export class ResponseClinicalRecordDto {
    id: string
    patientId: string
    tumorTypeId: number 
    diagnos_is_Date: string
    stage: cancerStage
    treatmentProtocol: string
}