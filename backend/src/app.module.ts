
import { Module } from '@nestjs/common'
import { CeeModule } from './modules/cee/cee.module.js'
import { PdfModule } from './modules/pdf/pdf.module.js'
import { EsignModule } from './modules/esign/esign.module.js'

@Module({ imports: [CeeModule, PdfModule, EsignModule] })
export class AppModule {}
