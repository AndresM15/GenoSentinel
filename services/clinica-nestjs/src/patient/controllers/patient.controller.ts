import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PatientService } from '../services/impl/patient.service';
import { CreatePatientDto } from '../dto/create-patient.dto';

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
        return this.patientService.findAllPatients();
    }

    // @Param: Extrae el id de 'uuid'
    @Get(':id')
    findOneBy(@Param('id') id: string){
        return this.patientService.findOneByPatient(id);

    }
}
