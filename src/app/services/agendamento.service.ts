import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Agendamento {
  nome: string;
  servico: string;
  dataAgendamento: Date;
  horario: string;
}

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  private agendamentos: Agendamento[] = [];

  salvarAgendamento(agendamento: Agendamento): Observable<Agendamento> {
    this.agendamentos.push(agendamento);
    return of(agendamento);
  }

  getAgendamentos(): Agendamento[] {
    return this.agendamentos;
  }
}