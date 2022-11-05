import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewEventComponent } from './new-event/new-event.component';
import { RegistrationComponent } from './registration/registration.component';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'sign-up', component: RegistrationComponent},
    { path: 'new-event', component: NewEventComponent},
    { path: 'summary', component: SummaryComponent},
    { path: 'event/edit/:id', component: NewEventComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }