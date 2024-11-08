import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { CardInfoComponent } from './card-info/card-info.component';
import { PagamentoComponent } from './pagamento/pagamento.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'agendamento', component: AgendamentoComponent },
  { path: 'card-info', component: CardInfoComponent },
  { path: 'pagamento', component: PagamentoComponent }
];