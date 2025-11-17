
import { Body, Controller, Param, Post } from '@nestjs/common'
import { CeeService, CreateContratDto } from './cee.service.js'
import { PdfService } from '../pdf/pdf.service.js'
import { EsignService } from '../esign/esign.service.js'

@Controller('contrats-cee')
export class CeeController{
  constructor(private cee:CeeService, private pdf:PdfService, private esign:EsignService){}

  @Post()
  async create(@Body() dto: CreateContratDto){ return this.cee.create(dto) }

  @Post(':id/pdf')
  async pdfContrat(@Param('id') id:string, @Body() body:any){
    const html = `<html><body><h1>Contrat CEE ${id}</h1><p>Salarie: ${body?.salarie?.nom||''} ${body?.salarie?.prenom||''}</p></body></html>`
    const buf = await this.pdf.htmlToPdf(html)
    return { ok:true, size: buf.length }
  }

  @Post(':id/esign')
  async esign(@Param('id') id:string, @Body() body:any){
    const { provider = process.env.ESIGN_PROVIDER||'yousign' } = body
    return this.esign.sendForSignature({ provider, contratId:id, html: body.html, pdfBase64: body.pdfBase64, recipients: body.recipients })
  }
}
