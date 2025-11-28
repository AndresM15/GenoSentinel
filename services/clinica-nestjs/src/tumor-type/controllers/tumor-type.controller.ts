import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { TumorTypeService } from "../services/tumor-type.service";
import { CreateTumorTypeDto } from "../dto/create-tumor-type.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { TumorType } from "../entities/tumor-type.entity";

@Controller('tumor-type')
export class TumorTypeController {
    constructor(private readonly tumorTypeService: TumorTypeService){}

    @Post('create-tumor-type')
    create(@Body() createTumorTypeDto: CreateTumorTypeDto){
        return this.tumorTypeService.createTumorType(createTumorTypeDto);
    }

    @Get('find-tumor-type')
    findAll(){
        return this.tumorTypeService.findAllTumorTypes();
    }

    @Get('find-tumor-type/:id')
    findOneBy(@Param('id')id: number){
        return this.tumorTypeService.findOneByTumorType(id);
    }   
}