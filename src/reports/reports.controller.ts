import { Body, Controller, Post } from '@nestjs/common';
import { CreateReportDTO } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}
  @Post()
  create(@Body() body: CreateReportDTO) {
    this.reportsService.create(body);
  }
}
