import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule
  ]
})
export class CardInfoComponent implements OnInit {
  nome: string = '';
  servico: string = '';
  data: string = '';
  horario: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.nome = params['nome'] || 'Fulano';
      this.servico = params['servico'] || 'Corte de cabelo';
      this.data = this.formatarData(params['dataAgendamento']) || '14:00';
      this.horario = params['horario'] || '14:00';
    });
  }

  formatarData(data: string): string {
    const dataObj = new Date(data);
    const dia = dataObj.getDate().toString().padStart(2, '0');
    const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  pagar() {
    this.router.navigate(['/pagamento']);
  }

  voltar() {
    this.router.navigate(['/']);
  }
}