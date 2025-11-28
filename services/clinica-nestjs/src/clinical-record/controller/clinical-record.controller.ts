import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { ClinicalRecordService } from "../services/clinical-record.service";
import { CreateClinicalRecordDto } from "../dto/create-clinical-record.dto";
import { UpdateClinicalRecordDto } from "../dto/update-clinical-record.dto";

@Controller('clinical-record')
export class ClinicalRecordController {
    constructor(private readonly clinicalRecordService: ClinicalRecordService){}

    @Post('create-clinical-record')
    create(@Body() createClinicalRecordDto: CreateClinicalRecordDto){
        return this.clinicalRecordService.createClinicalRecord(createClinicalRecordDto)
    }

    @Get('find-clinical-record')
    findAll(){
        return this.clinicalRecordService.findAllClinicalRecords()
    }

    @Get('find-clinical-record/:id')
    findByOne(@Param('id') id: string){
        return this.clinicalRecordService.findByOneClinicalRecord(id)
    }

    @Patch('update-clinical-record/:id')
    update(@Param('id') id: string , @Body() updateClinicalRecordDto: UpdateClinicalRecordDto){
        return this.clinicalRecordService.updateClinicalRecord(id,updateClinicalRecordDto)
    }

    
}