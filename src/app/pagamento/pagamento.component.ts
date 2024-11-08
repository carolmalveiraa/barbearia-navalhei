import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class PagamentoComponent implements OnInit {
  formaPagamento: string = '';
  valor: number = 50.00;
  chavePix: string = 'barbearia.navalhaei@pix.com';

    // Dados para Cartão de Crédito
    cartaoTitular: string = '';
    cartaoNumero: string = '';
    cartaoValidade: string = '';
    cartaoCVV: string = '';
  
    // Dados para Boleto
    boletoDadosCliente = {
      nome: '',
      cpf: ''
    };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.valor = +params['valor'] || this.valor;
    });
  }

  onFormaPagamentoChange() {
    // Resetar campos quando a forma de pagamento muda
    this.cartaoTitular = '';
    this.cartaoNumero = '';
    this.cartaoValidade = '';
    this.cartaoCVV = '';
    this.boletoDadosCliente = { nome: '', cpf: '' };
  }

  isPagamentoValido(): boolean {
    switch(this.formaPagamento) {
      case 'cartao':
        return !!(this.cartaoTitular && 
                  this.cartaoNumero && 
                  this.cartaoValidade && 
                  this.cartaoCVV);
      case 'pix':
        return true; // Pix sempre válido
      case 'boleto':
        return !!(this.boletoDadosCliente.nome && 
                  this.boletoDadosCliente.cpf);
      default:
        return false;
    }
  }

  confirmarPagamento() {
    if (this.valor <= 0) {
      this.snackBar.open('Valor do pagamento inválido!', 'Fechar', {
        duration: 2000
      });
      return;
    }
    
    if (!this.formaPagamento) {
      this.snackBar.open('Por favor, selecione uma forma de pagamento!', 'Fechar', {
        duration: 2000
      });
      return;
    }

    let mensagem = 'Pagamento realizado com sucesso!';
    if (this.formaPagamento === 'cartao') {
      mensagem += ` Cartão: ${this.cartaoNumero}`;
    } else if (this.formaPagamento === 'boleto') {
      mensagem += ` Boleto gerado para: ${this.boletoDadosCliente.nome}`;
    }

    this.snackBar.open(mensagem, 'Fechar', {
      duration: 2000
    });

    // Simular processamento do pagamento
    setTimeout(() => this.voltar(), 2000);
  }

  voltar() {
    this.router.navigate(['/']);
  }
}
