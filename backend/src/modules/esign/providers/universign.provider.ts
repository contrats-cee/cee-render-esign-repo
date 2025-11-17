
import { Injectable } from '@nestjs/common'
import axios from 'axios'
import type { SendParams } from '../esign.service.js'

@Injectable()
export class UniversignProvider{
  async send(p: SendParams){
    const api = process.env.UNIVERSIGN_API_BASE || 'https://api.universign.com'
    const key = process.env.UNIVERSIGN_API_KEY
    if(!key) throw new Error('UNIVERSIGN_API_KEY manquant')
    const headers = { Authorization: `Bearer ${key}` }
    // Simplified illustration
    const tx = await axios.post(api + '/v1/transactions', { name:`CEE ${p.contratId}` }, { headers })
    const txId = tx.data.id
    if(p.pdfBase64){ await axios.post(`${api}/v1/transactions/${txId}/documents`, { name:`contrat-${p.contratId}.pdf`, content:p.pdfBase64 }, { headers }) }
    for(const r of p.recipients){ await axios.post(`${api}/v1/transactions/${txId}/signatures`, { signer:r.email }, { headers }) }
    const start = await axios.post(`${api}/v1/transactions/${txId}/start`, {}, { headers })
    return { ok:true, provider:'universign', transactionId: txId, data:start.data }
  }
}
