
import { Injectable } from '@nestjs/common'

export interface CreateContratDto{ salarie:{nom:string; prenom:string}; organisateurId?:string; dateDebut:string; dateFin:string; logeSurPlace?:boolean; remunerationJour:number; joursPrevus:number }

@Injectable()
export class CeeService{
  async create(dto: CreateContratDto){
    return { id: Math.random().toString(36).slice(2), ...dto }
  }
}
