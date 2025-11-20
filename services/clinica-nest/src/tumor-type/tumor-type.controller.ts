import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TumorTypeService } from './tumor-type.service';
import { CreateTumorTypeDto } from './dto/create-tumor-type.dto';
import { UpdateTumorTypeDto } from './dto/update-tumor-type.dto';

@Controller('tumor-type')
export class TumorTypeController {
  constructor(private readonly tumorTypeService: TumorTypeService) {}

  @Post()
  create(@Body() createTumorTypeDto: CreateTumorTypeDto) {
    return this.tumorTypeService.create(createTumorTypeDto);
  }

  @Get()
  findAll() {
    return this.tumorTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tumorTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTumorTypeDto: UpdateTumorTypeDto) {
    return this.tumorTypeService.update(+id, updateTumorTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tumorTypeService.remove(+id);
  }
}
