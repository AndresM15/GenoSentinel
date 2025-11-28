import { cancerStage } from "../entities/clinical-record.entity"

/**
 * DTO de salida para devolver un registro clínico al cliente.
 *
 * Este DTO define el formato con el que la información
 * almacenada en la base de datos se envía al frontend o consumidor.
 * 
 */

export class ResponseClinicalRecordDto {
    id: string
    patientId: string
    tumorTypeId: number 
    diagnos_is_Date: string
    stage: cancerStage
    treatmentProtocol: string
}