import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  private agendamentos: any[] = [];

  salvarAgendamento(agendamento: any): Observable<any> {
    this.agendamentos.push(agendamento);
    return of(agendamento); // Simula uma chamada HTTP bem-sucedida
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
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class AgendamentoComponent {
  agendamentoForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private agendamentoService: AgendamentoService
  ) {
    this.agendamentoForm = this.formBuilder.group({
      nome: ['', Validators.required],
      servico: ['', Validators.required],
      dataAgendamento: ['', Validators.required]
    });
  }

  agendar() {
    if (this.agendamentoForm.valid) {
      const horario = this.gerarHorarioUnico();
      const agendamento = {
        ...this.agendamentoForm.value,
        data: horario
      };

      this.agendamentoService.salvarAgendamento(agendamento).subscribe(
        () => this.router.navigate(['/card-info'], { queryParams: agendamento }),
        (error) => console.error('Erro ao salvar agendamento:', error)
      );
    } else {
      alert('Preencha todos os campos');
    }
  }

  gerarHorarioUnico(): string {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    if (minutes < 30) {
      minutes = 30;
    } else {
      minutes = 0;
      hours = (hours + 1) % 24;
    }

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
}
