import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss']
})
export class PagamentoComponent {
  constructor(private router: Router) {}

  confirmarPagamento() {
    alert('Pagamento realizado com sucesso!');
    this.router.navigate(['/']);
  }
}