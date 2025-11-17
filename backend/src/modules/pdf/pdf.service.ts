
import { Injectable } from '@nestjs/common'
import puppeteer from 'puppeteer'

@Injectable()
export class PdfService{
  async htmlToPdf(html: string): Promise<Buffer>{
    let browser
    try{
      browser = await puppeteer.launch({ args:["--no-sandbox","--disable-setuid-sandbox"] })
      const page = await browser.newPage()
      await page.setContent(html, { waitUntil: 'networkidle0' })
      const pdf = await page.pdf({ format:'A4', printBackground:true, margin:{ top:'20mm', right:'15mm', bottom:'20mm', left:'15mm' } })
      await browser.close()
      return pdf
    } catch(e){
      if(browser) await browser.close().catch(()=>{})
      throw e
    }
  }
}
