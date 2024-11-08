
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
})
export class PagamentoComponent {
  formaPagamento: string = 'cartao';
  valor: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.valor = params['valor'] || 0;
    });
  }

  confirmarPagamento() {
    let mensagem = 'Pagamento realizado com sucesso!';
    if (this.formaPagamento === 'boleto') {
      mensagem = 'Boleto gerado e enviado para o seu e-mail!';
    } else if (this.formaPagamento === 'pix') {
      mensagem = 'Pagamento via Pix realizado com sucesso!';
    }

    this.snackBar.open(mensagem, 'Fechar', {
      duration: 3000
    });
    this.router.navigate(['/']);
  }
}