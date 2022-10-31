import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faTicket, faUser } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'jegy-frontend';
  faTicket = faTicket;
  faUser = faUser;

  constructor(private router: Router, private modalService: NgbModal) {
    this.initJegyertekesito();
  }


  showLogin() {
    let login = this.modalService.open(LoginComponent, { backdrop: 'static', centered: true });

    (login.componentInstance as LoginComponent).initLogin({ close: () => login.close() });
  }

  initJegyertekesito() {
    //this.router.navigate(['/home']);
  }
}