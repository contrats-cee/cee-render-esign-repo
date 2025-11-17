import { Module } from '@nestjs/common';
import { CeeService } from './cee.service';
import { CeeController } from './cee.controller';
import { PdfModule } from '../pdf/pdf.module';
import { EsignModule } from '../esign/esign.module';

@Module({
  imports: [PdfModule, EsignModule], // <-- important
  providers: [CeeService],
  controllers: [CeeController],
})
export class CeeModule {}
