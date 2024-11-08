import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule
  ]
})
export class PagamentoComponent {
  constructor(private router: Router) {}

  confirmarPagamento() {
    alert('Pagamento realizado com sucesso!');
    this.router.navigate(['/']);
  }
}