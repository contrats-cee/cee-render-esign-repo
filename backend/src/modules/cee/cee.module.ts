
import { Module } from '@nestjs/common'
import { CeeService } from './cee.service.js'
import { CeeController } from './cee.controller.js'

@Module({ providers:[CeeService], controllers:[CeeController] })
export class CeeModule {}
