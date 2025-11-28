import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TumorType } from "../entities/tumor-type.entity";
import { CreateTumorTypeDto } from "../dto/create-tumor-type.dto";
import { ResponseTumorTypeDto } from "../dto/response-tumor-type.dto";

@Injectable()
export class TumorTypeService {
    constructor(
        @InjectRepository(TumorType) private readonly tumorTypeRepository: Repository<TumorType>
    ){}

    async createTumorType(createTumorTypeDto: CreateTumorTypeDto){
        try{
        // 1.) Extraer la información del tumorType
         const {name,systemAffected} = createTumorTypeDto

        // 2.) Crear el objeto que se va a guardar en la base de datos
        const tumorType: TumorType = this.tumorTypeRepository.create({
            name,
            systemAffected
        });

        // 3.) Guardar el objeto en base de datos.
        const saveDataDto = await this.tumorTypeRepository.save(tumorType)

        // 4.) Mapear el DTO a entidad de forma manual
        const responseDto: ResponseTumorTypeDto = {
            id: saveDataDto.id,
            name: saveDataDto.name,
            systemAffected: saveDataDto.systemAffected
        }

        // Retornar el DTO de salida con los datos del tumor-type guardado
        return responseDto;

        }catch(error){
            throw new HttpException('Error al guardar el tumor type', HttpStatus.BAD_REQUEST);
        }
    }

    findAllTumorType(){

    }

    findOneByTumorType(id: string){

    }

}