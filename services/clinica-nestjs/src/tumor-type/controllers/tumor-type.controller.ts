import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { TumorTypeService } from "../services/tumor-type.service";
import { CreateTumorTypeDto } from "../dto/create-tumor-type.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { TumorType } from "../entities/tumor-type.entity";

/**
 * Controlador para manejar las rutas Endpoints de TumorType.
 * Permite crear, listar y consultar tipos de tumor.
 */

@Controller('tumor-type')
export class TumorTypeController {
    constructor(private readonly tumorTypeService: TumorTypeService){}

     /**
     * Crear un nuevo tipo de tumor.
     * Endpoint: POST /tumor-type/create-tumor-type
     * @param createTumorTypeDto - DTO con el nombre y sistema afectado del tumor
     * @returns DTO de respuesta con los datos del tumor creado
     */

    @Post('create-tumor-type')
    create(@Body() createTumorTypeDto: CreateTumorTypeDto){
        return this.tumorTypeService.createTumorType(createTumorTypeDto);
    }

     /**
     * Listar todos los tipos de tumor registrados.
     * Endpoint: GET /tumor-type/find-tumor-type
     * @returns Arreglo de DTOs de todos los tipos de tumor
     */

    @Get('find-tumor-type')
    findAll(){
        return this.tumorTypeService.findAllTumorTypes();
    }

    /**
     * Consultar un tipo de tumor específico por su ID.
     * Endpoint: GET /tumor-type/find-tumor-type/:id
     * @param id - ID del tumor que se desea consultar
     * @returns DTO de respuesta con los datos del tumor encontrado
     */
    
    @Get('find-tumor-type/:id')
    findOneBy(@Param('id')id: number){
        return this.tumorTypeService.findOneByTumorType(id);
    }   
}