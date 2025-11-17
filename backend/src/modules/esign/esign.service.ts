
import { Injectable } from '@nestjs/common'
import { YousignProvider } from './providers/yousign.provider.js'
import { DocusignProvider } from './providers/docusign.provider.js'
import { UniversignProvider } from './providers/universign.provider.js'

export interface SendParams{ provider:string; contratId:string; html?:string; pdfBase64?:string; recipients:{ email:string; firstName?:string; lastName?:string }[] }

@Injectable()
export class EsignService{
  constructor(private ys:YousignProvider, private ds:DocusignProvider, private us:UniversignProvider){}
  async sendForSignature(p: SendParams){
    switch((p.provider||'yousign').toLowerCase()){
      case 'docusign': return this.ds.send(p)
      case 'universign': return this.us.send(p)
      default: return this.ys.send(p)
    }
  }
}
