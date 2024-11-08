import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AgendamentoService, Agendamento } from '../services/agendamento.service';

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
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class AgendamentoComponent {
  agendamentoForm: FormGroup;
  servicos: string[] = ['Corte de cabelo', 'Barba', 'Corte e Barba', 'Coloração'];
  horariosDisponiveis: string[] = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30'];
  minDate: Date = new Date();
  maxDate: Date = new Date(new Date().setMonth(new Date().getMonth() + 1));

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private agendamentoService: AgendamentoService
  ) {
    this.agendamentoForm = this.formBuilder.group({
      nome: ['', Validators.required],
      servico: ['', Validators.required],
      dataAgendamento: ['', Validators.required],
      horario: ['', Validators.required]
    });
  }

  agendar() {
    if (this.agendamentoForm.valid) {
      const agendamento: Agendamento = {
        ...this.agendamentoForm.value,
        dataAgendamento: new Date(this.agendamentoForm.value.dataAgendamento)
      };

      this.agendamentoService.salvarAgendamento(agendamento).subscribe(
        () => this.router.navigate(['/card-info'], { queryParams: agendamento }),
        (error: any) => console.error('Erro ao salvar agendamento:', error)
      );
    } else {
      alert('Preencha todos os campos');
    }
  }
}