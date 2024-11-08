import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router'; // Adicione esta linha
import { RouterModule } from '@angular/router'; // Adicione esta linha se não estiver importada

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
    MatButtonModule,
    RouterModule // Adicione RouterModule aqui
  ]
})
export class AgendamentoComponent {
  nome: string = '';

  constructor(private router: Router) {}

  agendar() {
    if (this.nome) {
      const horario = this.gerarHorarioUnico();
      this.router.navigate(['/card-info'], { queryParams: { nome: this.nome, horario: horario } });
    } else {
      alert('Por favor, insira um nome');
    }
  }

  gerarHorarioUnico(): string {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    return `${hours}:${minutes}:${seconds}`;
  }
}