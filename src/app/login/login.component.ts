import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: string = '';
  senha: string = '';

  constructor(private router: Router) {}

  login() {
    if (this.usuario === 'admin' && this.senha === 'admin') {
      this.router.navigate(['/agendamento']);
    } else {
      alert('Usuário ou senha inválidos');
    }
  }
}