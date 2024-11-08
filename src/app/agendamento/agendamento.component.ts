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
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


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
    MatNativeDateModule,
    MatSnackBarModule,
    CommonModule
  ]
})
export class AgendamentoComponent {

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private agendamentoService: AgendamentoService
  ) {
    this.agendamentoForm = this.formBuilder.group({
      nome: ['', [
        Validators.required, 
        Validators.minLength(2)
      ]],
      servico: ['', Validators.required],
      dataAgendamento: ['', Validators.required],
      horario: ['', Validators.required]
    });
  }

validarAgendamento(): boolean {
    const form = this.agendamentoForm;
    
    // Validações personalizadas
    if (form.get('nome')?.value.length < 2) {
      this.mostrarErro('Nome deve ter pelo menos 2 caracteres');
      return false;
    }

    const dataSelecionada = form.get('dataAgendamento')?.value;
    if (dataSelecionada < new Date()) {
      this.mostrarErro('Não é possível agendar para uma data passada');
      return false;
    }

    return true;
  }

  private mostrarErro(mensagem: string) {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 3000,
      panelClass: ['erro-snackbar']
    });
  }

  agendamentoForm: FormGroup;
  servicos: string[] = ['Corte de cabelo', 'Barba', 'Corte e Barba', 'Coloração'];
  horariosDisponiveis: string[] = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30'];
  minDate: Date = new Date();
  maxDate: Date = new Date(new Date().setMonth(new Date().getMonth() + 1));


  agendar() {
    // Verifica se o formulário é válido
    if (this.agendamentoForm.valid) {
      // Validações adicionais
      if (this.validarAgendamento()) {
        const agendamento = {
          ...this.agendamentoForm.value,
          dataAgendamento: new Date(this.agendamentoForm.value.dataAgendamento)
        };

        this.agendamentoService.salvarAgendamento(agendamento).subscribe({
          next: (resultado) => {
            // Navegação para próxima tela ou mensagem de sucesso
            this.snackBar.open('Agendamento realizado com sucesso!', 'Fechar', {
              duration: 3000,
              panelClass: ['sucesso-snackbar']
            });
            
            this.router.navigate(['/card-info'], { 
              queryParams: { 
                ...resultado,
                dataAgendamento: resultado.dataAgendamento.toISOString() 
              }
            });
          },
          error: (erro) => {
            // Tratamento de erro do serviço
            this.mostrarErro('Erro ao realizar agendamento: ' + erro.message);
          }
        });
      }
    } else {
      // Marca todos os campos como tocados para mostrar validações
      Object.keys(this.agendamentoForm.controls).forEach(campo => {
        const controle = this.agendamentoForm.get(campo);
        controle?.markAsTouched();
      });

      this.mostrarErro('Por favor, preencha todos os campos corretamente');
    }
  }
}