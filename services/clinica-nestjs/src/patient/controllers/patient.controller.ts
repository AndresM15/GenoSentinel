import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PatientService } from '../services/impl/patient.service';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { UpdatePatientDto } from '../dto/update-patient.dto';

/**
 * PatientController
 * 
 * Esta clase se encarga de manejar todos los endpoints relacionados con los pacientes.
 * Actúa como puente entre las solicitudes HTTP del cliente y la lógica de negocio en PatientService.
 * Cada método corresponde a un endpoint específico.
 */

@Controller('patient')
export class PatientController {
    constructor(
        private patientService: PatientService
    ){}

    /** 
     * create
     * Endpoint: POST /patient
     * Permite crear un nuevo paciente.
     * Recibe los datos de entrada a través de CreatePatientDto.
     * Retorna el DTO de salida PatientResponseDto.
     */

    @Post()
    create(@Body() createPatientDTO: CreatePatientDto){
        return this.patientService.createPatient(createPatientDTO)
    }

    /**
     * findAll
     * Endpoint: GET /patient
     * Obtiene todos los pacientes registrados.
     * Retorna un arreglo de PatientResponseDto.
     */

    @Get()
    findAll(){
        return this.patientService.findAllPatients()
    }

    /**
     * findOneBy
     * Endpoint: GET /patient/:id
     * Obtiene un paciente específico por su id.
     * Retorna el DTO de salida PatientResponseDto.
     */

    @Get(':id')
    findOneBy(@Param('id') id: string){    // @param id: Extrae el id de 'uuid'
        return this.patientService.findOneByPatient(id)
    }

    /**
     * update
     * Endpoint: PUT /patient/:id
     * Permite actualizar los datos de un paciente.
     * @param id - UUID del paciente a modificar.
     * @param UpdatePatientDto - Datos opcionales que se desean actualizar.
     * Retorna el DTO de salida PatientResponseDto con los datos actualizados.
     */

    @Put(':id') // Parametro de ruta dinámico ':' (Cambia segun la solicitud del cliente)
    update(@Param('id') id: string, @Body() UpdatePatientDto: UpdatePatientDto){
        return this.patientService.updatePatient(id,UpdatePatientDto)

    }

    /**
     * deactivate
     * Endpoint: PUT /patient/:id/follow_up
     * Permite desactivar un paciente cambiando su estado a FOLLOW UP.
     * @param id - UUID del paciente a desactivar.
     * Retorna el nuevo estado del paciente (status).
     */
    @Put(':id/deactive') 
    deactivate(@Param('id') id: string){
        return this.patientService.deactivatePatient(id)
    }
}
