import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    NgxMaskModule.forRoot() // Verifique a versão do ngx-mask
  ]
})
export class PagamentoComponent {
  constructor(
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  confirmarPagamento() {
    this.snackBar.open('Pagamento realizado com sucesso!', 'Fechar', {
      duration: 3000
    });
    this.router.navigate(['/']);
  }
}
