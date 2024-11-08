import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class LoginComponent {
  usuario: string = '';
  senha: string = '';

  constructor(private router: Router) {}  // Injete o Router no construtor

  login() {
    if (this.usuario && this.senha) {
      this.router.navigate(['/agendamento']);
    } else {
      alert('Usuário ou senha inválidos');
    }
  }
}