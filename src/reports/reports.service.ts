import { Injectable } from '@nestjs/common';
import { Report } from './reports.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReportDTO } from './dtos/create-report.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}
  create(report: CreateReportDTO) {
    const reportEntity = this.repo.create(report);
    return this.repo.save(reportEntity);
  }
}
