import { cancerStage } from "../entities/clinical-record.entity"

export class ResponseClinicalRecordDto {
    id: string
    patientId: string
    tumorTypeId: number 
    diagnosisDate: string
    stage: cancerStage
    treatmentProtocol: string
}