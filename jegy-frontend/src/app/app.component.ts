import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faTicket, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'jegy-frontend';
  faTicket = faTicket;
  faUser = faUser;
  faRightFromBracket = faRightFromBracket;

  username = null;

  constructor(private modalService: NgbModal, private sService: StorageService) {
    this.initJegyertekesito();
  }


  showLogin() {
    if (this.username === null) {
      let login = this.modalService.open(LoginComponent, { backdrop: 'static', centered: true });
      (login.componentInstance as LoginComponent).initLogin({ close: () => login.close() });
    }
  }

  initJegyertekesito() {
    //this.router.navigate(['/home']);
    const loggedUser = this.sService.getUser()
    if(loggedUser !== null){
      this.username = loggedUser.username
    }
  }

  logout(){
    this.sService.signOut();
    window.location.reload();
  }
}
