import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewEventComponent } from './new-event/new-event.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './services/guard.service';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: RegistrationComponent },
  { path: 'new-event', component: NewEventComponent, canActivate: [AuthGuard] },
  { path: 'event/:eventId/category/:category/summary', component: SummaryComponent, canActivate: [AuthGuard] },
  { path: 'event/edit/:id', component: NewEventComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }