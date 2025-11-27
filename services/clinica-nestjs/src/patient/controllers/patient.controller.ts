import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PatientService } from '../services/impl/patient.service';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { UpdatePatientDto } from '../dto/update-patient.dto';

@Controller('patient')
export class PatientController {
    constructor(
        private patientService: PatientService
    ){}

    @Post()
    create(@Body() createPatientDTO: CreatePatientDto){
        return this.patientService.createPatient(createPatientDTO)
    }

    @Get()
    findAll(){
        return this.patientService.findAllPatients()
    }

    // @Param: Extrae el id de 'uuid'
    @Get(':id')
    findOneBy(@Param('id') id: string){
        return this.patientService.findOneByPatient(id)

    }

    @Put(':id') // Parametro de ruta dinámico ':' (Cambia segun la solicitud del cliente)
    update(@Param('id') id: string, @Body() UpdatePatientDto: UpdatePatientDto){
        return this.patientService.updatePatient(id,UpdatePatientDto)

    }

    @Put(':id/deactivate') // Ruta para desactivar paciente
    deactivate(@Param('id') id: string){
        return this.patientService.deactivatePatient(id)
    }
}
