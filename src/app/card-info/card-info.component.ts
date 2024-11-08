import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss']
})
export class CardInfoComponent {
  nome: string = 'Fulano';
  horario: string = '14:00';

  constructor(private router: Router) {}

  pagar() {
    this.router.navigate(['/pagamento']);
  }
}