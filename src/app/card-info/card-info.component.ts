import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

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
export class CardInfoComponent {
  nome: string = 'Fulano';
  horario: string = '14:00';

  constructor(private router: Router) {}

  pagar() {
    this.router.navigate(['/pagamento']);
  }
}