import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component'
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component'
import { DasboardComponent } from './dasboard/dasboard.component'
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    // { path: '', component: TodoComponent },
    { path: 'todo', component: TodoComponent },
    { path: 'registration', component: RegistrationComponent, },
    { path: 'dashboard', component: DasboardComponent, canActivate: [AuthGuard] },
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
