import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClinicalRecord } from "../entities/clinical-record.entity";
import { Repository } from "typeorm";
import { CreateClinicalRecordDto } from "../dto/create-clinical-record.dto";
import { ResponseClinicalRecordDto } from "../dto/response-clinical-record.dto";

@Injectable()
export class ClinicalRecordService {
    constructor(
        @InjectRepository(ClinicalRecord) private readonly clinicalRecordRepository: Repository<ClinicalRecord>
    ){}

    async createClinicalRecord(createClinicalRecordDto: CreateClinicalRecordDto){
        try{
            // 1.) Extraer la información del historial clinico
            const {patientId, tumorTypeId, diagnos_is_Date, stage, treatmentProtocol} = createClinicalRecordDto

            // 2.) Convertir o transoformar los datos pertinentes.
            const transformer_date = new Date(diagnos_is_Date);

            // 3.) Crear el objeto que se va a guardar en base de datos.
            const clinicalRecord: ClinicalRecord = this.clinicalRecordRepository.create({
                patientId,
                tumorTypeId,
                diagnos_is_Date: transformer_date,
                stage,
                treatmentProtocol
            })  

            // 4.) Guardar el objeto en base de datos.
            const saveClinicaRecordDto = await this.clinicalRecordRepository.save(clinicalRecord)

            // 5.) Mapeamos el DTO a entidad
            const responseDto: ResponseClinicalRecordDto = {
                id: saveClinicaRecordDto.id,
                patientId: saveClinicaRecordDto.patientId,
                tumorTypeId: saveClinicaRecordDto.tumorTypeId,
                diagnos_is_Date: saveClinicaRecordDto.diagnos_is_Date.toISOString(),
                stage: saveClinicaRecordDto.stage,
                treatmentProtocol: saveClinicaRecordDto.treatmentProtocol
            }

            // 6.) Retornamos el DTO de salida con los datos del historial clinico guardado
            return responseDto;

            // 7.) Manejo de errores
        }catch(error){
            throw new HttpException('Error al guardar el historial clínico', HttpStatus.BAD_REQUEST);
        }
    }

    async findAllClinicalRecords(){
        try{

            // 1.) Obtener los historiales clinicos guardados en la base de datos
            const clinicalRecords = await this.clinicalRecordRepository.find()

            // 2.) Inicializar una lista vacía para almacenar los DTOs
            const responseDto: ResponseClinicalRecordDto[] = [];

            // 3.) Iterar y mapear cada paciente a DTO
            for(let i = 0; i < clinicalRecords.length; i++){
                const c = clinicalRecords[i]
                const dto: ResponseClinicalRecordDto = {
                    id: c.id,
                    patientId: c.patientId,
                    tumorTypeId: c.tumorTypeId,
                    diagnos_is_Date: new Date(c.diagnos_is_Date).toISOString(),
                    stage: c.stage,
                    treatmentProtocol: c.treatmentProtocol
                }

                // Agregamos el DTO mapeado a la lista que se devolverá al cliente
                responseDto.push(dto)
            }

            // Retornamos la lista de pacientes ya mapeada a DTOs
            return responseDto

        }catch(error){
            throw new HttpException('La lista de pacientes está vacia', HttpStatus.NOT_FOUND);
        }
    }
}
