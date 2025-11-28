import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { ClinicalRecordService } from "../services/clinical-record.service";
import { CreateClinicalRecordDto } from "../dto/create-clinical-record.dto";
import { UpdateClinicalRecordDto } from "../dto/update-clinical-record.dto";

/**
 * Controlador para gestionar los registros clínicos (ClinicalRecord).
 * 
 * Expone endpoints para:
 * - Crear un registro clínico
 * - Listar todos los registros clínicos
 * - Buscar un registro clínico por ID
 * - Actualizar parcialmente un registro clínico
 */

@Controller('clinical-record')
export class ClinicalRecordController {
    constructor(private readonly clinicalRecordService: ClinicalRecordService){}

    /**
     * POST /clinical-record/create-clinical-record
     * Crea un nuevo historial clínico usando los datos enviados por el cliente.
     */

    @Post('create-clinical-record')
    create(@Body() createClinicalRecordDto: CreateClinicalRecordDto){
        return this.clinicalRecordService.createClinicalRecord(createClinicalRecordDto)
    }

     /**
     * GET /clinical-record/find-clinical-record
     * Retorna todos los historiales clínicos registrados.
     */

    @Get('find-clinical-record')
    findAll(){
        return this.clinicalRecordService.findAllClinicalRecords()
    }

    /**
     * GET /clinical-record/find-clinical-record/:id
     * Busca y retorna un historial clínico por su ID.
     */

    @Get('find-clinical-record/:id')
    findByOne(@Param('id') id: string){
        return this.clinicalRecordService.findByOneClinicalRecord(id)
    }

    /**
     * PATCH /clinical-record/update-clinical-record/:id
     * Actualiza parcialmente un historial clínico existente.
     * Solo modifica los campos enviados en el cuerpo de la petición.
     */
    
    @Patch('update-clinical-record/:id')
    update(@Param('id') id: string , @Body() updateClinicalRecordDto: UpdateClinicalRecordDto){
        return this.clinicalRecordService.updateClinicalRecord(id,updateClinicalRecordDto)
    }
}