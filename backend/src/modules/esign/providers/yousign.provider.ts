
import { Injectable } from '@nestjs/common'
import axios from 'axios'
import type { SendParams } from '../esign.service.js'

@Injectable()
export class YousignProvider{
  async send(p: SendParams){
    const api = process.env.YOUSIGN_API_BASE || 'https://api.yousign.app/v3'
    const key = process.env.YOUSIGN_API_KEY
    if(!key) throw new Error('YOUSIGN_API_KEY manquant')
    const headers = { Authorization: `Bearer ${key}` }
    const proc = await axios.post(api + '/procedures', { name: `CEE ${p.contratId}`, ordered: false }, { headers })
    const procId = proc.data.id
    if(p.pdfBase64){ await axios.post(api + '/files', { name: `contrat-${p.contratId}.pdf`, content: p.pdfBase64, procedure: procId }, { headers }) }
    for(const r of p.recipients){ await axios.post(api + '/members', { firstname: r.firstName||'Signer', lastname: r.lastName||'', email: r.email, procedure: procId }, { headers }) }
    const start = await axios.post(api + `/procedures/${procId}/start`, {}, { headers })
    return { ok:true, provider:'yousign', procedureId: procId, data: start.data }
  }
}
