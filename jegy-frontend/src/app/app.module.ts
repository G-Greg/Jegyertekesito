import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule } from '@angular/forms';
import { NewEventComponent } from './new-event/new-event.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SummaryComponent } from './summary/summary.component';
import { UserService } from './services/user.service';
import { EventService } from './services/event.service';
import { TicketService } from './services/ticket.service';
import { StorageService } from './services/storage.service';
import { TicketsComponent } from './tickets/tickets.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    NewEventComponent,
    SummaryComponent,
    TicketsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserService, EventService, TicketService, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
