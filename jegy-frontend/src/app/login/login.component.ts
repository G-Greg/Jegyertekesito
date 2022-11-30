import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { StorageService } from '../services/storage.service';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faKey = faKey;
  faUser = faUser;
  form = { username: '', password: '' }
  error = { isError: false, message: ''}

  @Output()
  close = new EventEmitter<void>();

  constructor(private router: Router, private uService: UserService, private sService: StorageService ) {
  }

  ngOnInit(): void {
  }

  initLogin(outputs: { close: (...args: any[]) => any }) {
    this.close.subscribe(outputs["close"]);
  }

  onSubmit() {

    if (this.form) {
      this.uService.login({username: this.form.username, password: this.form.password}).subscribe({
        next: (res) => this.handleLogin(res),
        error: (err) => {
          this.error.isError = true
          this.error.message = err.error.title
        }
      })
    }

  }
  showSignUp() {
    this.close.emit()
    this.router.navigate(['/sign-up']);
  }

  handleLogin(user : any){
    this.sService.saveUser(user)
    window.location.reload();
  }
}
