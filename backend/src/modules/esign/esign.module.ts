
import { Module } from '@nestjs/common'
import { EsignService } from './esign.service.js'
import { YousignProvider } from './providers/yousign.provider.js'
import { DocusignProvider } from './providers/docusign.provider.js'
import { UniversignProvider } from './providers/universign.provider.js'

@Module({ providers:[EsignService, YousignProvider, DocusignProvider, UniversignProvider], exports:[EsignService] })
export class EsignModule{}
