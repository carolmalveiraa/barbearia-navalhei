import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss']
})
export class AgendamentoComponent {
  nome: string = '';

  constructor(private router: Router) {}

  agendar() {
    if (this.nome) {
      // Lógica para agendar o horário
      this.router.navigate(['/card-info']);
    } else {
      alert('Por favor, insira um nome');
    }
  }
}