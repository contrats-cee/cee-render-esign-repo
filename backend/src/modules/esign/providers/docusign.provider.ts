
import { Injectable } from '@nestjs/common'
import axios from 'axios'
import type { SendParams } from '../esign.service.js'

@Injectable()
export class DocusignProvider{
  async send(p: SendParams){
    const accountId = process.env.DOCUSIGN_ACCOUNT_ID
    const base = process.env.DOCUSIGN_BASE_PATH || 'https://demo.docusign.net/restapi'
    const token = process.env.DOCUSIGN_ACCESS_TOKEN
    if(!accountId || !token) throw new Error('DocuSign non configuré (ACCOUNT_ID ou ACCESS_TOKEN manquant).')
    const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    const documents = p.pdfBase64 ? [{ documentBase64: p.pdfBase64, name: `contrat-${p.contratId}.pdf`, fileExtension:'pdf', documentId:'1' }] : []
    const recipients = { signers: p.recipients.map((r,i)=> ({ email:r.email, name:`${r.firstName||'Signer'} ${r.lastName||''}`.trim(), recipientId: String(i+1) })) }
    const body = { emailSubject: `Signature CEE ${p.contratId}`, documents, recipients, status: 'sent' }
    const res = await axios.post(`${base}/v2.1/accounts/${accountId}/envelopes`, body, { headers })
    return { ok:true, provider:'docusign', envelopeId: res.data.envelopeId }
  }
}
