
import 'reflect-metadata'
import * as dotenv from 'dotenv'
dotenv.config()
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module.js'

async function bootstrap(){
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  const port = Number(process.env.PORT || 10000)
  await app.listen(port, '0.0.0.0')
  console.log('API listening on', port)
}
bootstrap()
