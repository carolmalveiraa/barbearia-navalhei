import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

export interface Agendamento {
  id?: string;
  nome: string;
  servico: string;
  dataAgendamento: Date;
  horario: string;
  status?: 'agendado' | 'cancelado' | 'confirmado';
  valor?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  private agendamentos: Agendamento[] = [];
  salvarAgendamento(agendamento: Agendamento): Observable<Agendamento> {
    // Validações
    if (!agendamento.nome || agendamento.nome.length < 2) {
      return throwError(() => new Error('Nome inválido'));
    }

    // Gerar ID único
    agendamento.id = this.gerarIdUnico();
    
    // Definir status inicial
    agendamento.status = 'agendado';

    // Adicionar valores baseado no serviço
    agendamento.valor = this.calcularValorServico(agendamento.servico);

    this.agendamentos.push(agendamento);
    return of(agendamento);
  }

  // Método para calcular valor do serviço
  private calcularValorServico(servico: string): number {
    const precos: { [key: string]: number } = {
      'Corte de cabelo': 50.00,
      'Barba': 30.00,
      'Corte e Barba': 70.00,
      'Coloração': 100.00
    };
    return precos[servico] || 0;
  }

  // Método para gerar ID único
  private gerarIdUnico(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Método para buscar agendamento por ID
  buscarAgendamentoPorId(id: string): Observable<Agendamento | null> {
    const agendamento = this.agendamentos.find(a => a.id === id);
    return of(agendamento || null);
  }

  // Método para listar todos os agendamentos
  listarAgendamentos(): Observable<Agendamento[]> {
    return of(this.agendamentos);
  }

  // Método para cancelar agendamento
  cancelarAgendamento(id: string): Observable<boolean> {
    const index = this.agendamentos.findIndex(a => a.id === id);
    if (index !== -1) {
      this.agendamentos[index].status = 'cancelado';
      return of(true);
    }
    return of(false);
  }
}