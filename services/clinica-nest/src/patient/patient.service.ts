import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Patient } from './entities/patient.entity'
import { CreatePatientDto } from './dto/create-patient.dto'
import { UpdatePatientDto } from './dto/update-patient.dto'

/**
*   Servicio que gestiona pacientes en la base de datos.
* - Permite crear, actualizar,consultar pacientes y desactivar pacientes.
* - Usa el repositorio de TypeORM para interactuar con la tabla `Patient`.
*/

@Injectable()
export class PatientService {
  
  create(createPatientDto: CreatePatientDto){
    return "crear paciente"
  }

  findAll(){
    return "consultar todos los pacientes"
  }

  
  findOne(id: string) {
    return "Consultar un paciente"
  }

  update(id: string, updatePatientDto: UpdatePatientDto){
    return "Actualizar un paciente"
  }

  desactivatePatient(id: string){
    return "desactivar paciente"
  }

}
