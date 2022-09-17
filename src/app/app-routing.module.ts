import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/components/home/home.component';
import { LoginComponent } from 'src/components/login/login.component';
import { SignUpComponent } from 'src/components/sign-up/sign-up.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'signup',
    pathMatch: 'full',
    component: SignUpComponent
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent
  },
];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
