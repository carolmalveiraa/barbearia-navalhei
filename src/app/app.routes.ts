import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AgendamentoComponent } from './agendamento/agendamento.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'agendamento', component: AgendamentoComponent }
];