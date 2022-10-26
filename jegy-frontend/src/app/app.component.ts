import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faTicket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'jegy-frontend';
  faTicket = faTicket;

  constructor(private router: Router) {
    this.initJegyertekesito();
  }



  initJegyertekesito() {

  }
}