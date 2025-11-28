import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClinicalRecord } from "../entities/clinical-record.entity";
import { Repository } from "typeorm";
import { CreateClinicalRecordDto } from "../dto/create-clinical-record.dto";
import { ResponseClinicalRecordDto } from "../dto/response-clinical-record.dto";
import { UpdateClinicalRecordDto } from "../dto/update-clinical-record.dto";

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

                // 4.)Agregamos el DTO mapeado a la lista que se devolverá al cliente
                responseDto.push(dto)
            }

            // 5.) Retornamos la lista de las historias clinicas ya mapeada a DTOs
            return responseDto

            // 6.) Manejo de excepciones
        }catch(error){
            throw new HttpException('La lista de las historias clinicas estan vacias', HttpStatus.NOT_FOUND);
        }
    }

    async findByOneClinicalRecord(id: string){
        
        // 1.) Obtener una historia clinica en especifico guardado en la base de datos
        const saveClinicalRecord = await this.clinicalRecordRepository.findOne( { where:{ id } } )

        // 2.) Manejo de excepciones en caso de que el historial clinico no exista
        if(!saveClinicalRecord){
            throw new HttpException('Historial clinico no encontrado', HttpStatus.BAD_REQUEST)
        }

        // 3.) Mapeamos el DTO a entidad  

        const responseDto: ResponseClinicalRecordDto = {
                id: saveClinicalRecord.id,
                patientId: saveClinicalRecord.patientId,
                tumorTypeId: saveClinicalRecord.tumorTypeId,
                diagnos_is_Date: saveClinicalRecord.diagnos_is_Date.toISOString(),
                stage: saveClinicalRecord.stage,
                treatmentProtocol: saveClinicalRecord.treatmentProtocol
        }

        // 4.) Retornamos el DTO de respuesta ya mapeado
        return responseDto
    }

    async updateClinicalRecord(id: string, updateClinicalRecordDto : UpdateClinicalRecordDto){

            // 1. Buscar el historial clínico
            const clinicalRecord = await this.clinicalRecordRepository.findOne({where: { id }});

             // 3.) Verifica que el historial clinico ya existe
            if(!clinicalRecord ){
                throw new HttpException('Historial clinico no encontrado' , HttpStatus.NOT_FOUND)
            }

             // 4.) Actualizar manualmente SOLO los campos enviados
            if (updateClinicalRecordDto.diagnos_is_Date !== undefined) {
                clinicalRecord.diagnos_is_Date = new Date(updateClinicalRecordDto.diagnos_is_Date)
            }

            if (updateClinicalRecordDto.stage !== undefined) {
                clinicalRecord.stage = updateClinicalRecordDto.stage
            }

            if (updateClinicalRecordDto.treatmentProtocol !== undefined) {
                clinicalRecord.treatmentProtocol = updateClinicalRecordDto.treatmentProtocol
            }

            // 5.) Guardar cambios en la BD
            const savedRecord = await this.clinicalRecordRepository.save(clinicalRecord)

            // 6.) Mapeamos el DTO de respuesta
            const response: ResponseClinicalRecordDto = {
                id: savedRecord.id,
                patientId: savedRecord.patientId,
                tumorTypeId: savedRecord.tumorTypeId,
                diagnos_is_Date: savedRecord.diagnos_is_Date.toISOString(),
                stage: savedRecord.stage,
                treatmentProtocol: savedRecord.treatmentProtocol
            };

            // Retornamos el DTO de respuesta
            return response;
    }
}
