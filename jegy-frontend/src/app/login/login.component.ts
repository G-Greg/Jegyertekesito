import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = { username: '', password: '' }


  @Output()
  close = new EventEmitter<void>();

  constructor(private router: Router, private service: UserService) {
  }

  ngOnInit(): void {
  }

  initLogin(outputs: { close: (...args: any[]) => any }) {
    this.close.subscribe(outputs["close"]);
  }

  onSubmit() {

    if (this.form) {
      this.service.login({username: this.form.username, password: this.form.password}).subscribe({
        next: () => console.log("ok"),
        error: (err) => console.log(err.error)
      })
    }

  }
  showSignUp() {
    this.close.emit()
    this.router.navigate(['/sign-up']);
  }
}
