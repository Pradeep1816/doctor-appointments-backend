import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';

@Controller('api.schedula.in/v1/availability/')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Post('/create-availability')
  create(@Body() createAvailabilityDto: CreateAvailabilityDto) {
    console.log(createAvailabilityDto)
    return this.availabilityService.createAvailability(createAvailabilityDto);
  }

  @Get()
  findAll() {
    return this.availabilityService.findAll();
  }

  @Get('doctor/:id')
  findOne(@Param('id') id: string) {
    return this.availabilityService.findDoctor(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAvailabilityDto: UpdateAvailabilityDto) {
    return this.availabilityService.update(id, updateAvailabilityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.availabilityService.remove(id);
  }
}
