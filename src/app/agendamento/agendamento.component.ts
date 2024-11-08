import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  private agendamentos: any[] = [];

  salvarAgendamento(agendamento: any) {
    this.agendamentos.push(agendamento);
  }

  getAgendamentos() {
    return this.agendamentos;
  }
}

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class AgendamentoComponent {
  nome: string = '';
  servico: string = '';
  dataAgendamento: Date = new Date();

  constructor(
    private router: Router,
    private agendamentoService: AgendamentoService // Verifique a injeção do serviço
  ) {}

  agendar() {
    if (this.nome && this.servico) {
      const agendamento = {
        nome: this.nome,
        servico: this.servico,
        data: this.dataAgendamento,
      };

      this.agendamentoService.salvarAgendamento(agendamento);  // Verifique se este método existe no serviço
      this.router.navigate(['/card-info']);
    } else {
      alert('Preencha todos os campos');
    }
  }
}
