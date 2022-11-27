import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  close = new EventEmitter<void>();

  form = { name: null, username: null, email: null, password: null, terms: false }
  constructor(private service: UserService, private router: Router) {

  }

  status = { isError: false, message: ''}

  ngOnInit(): void {
  }

  onSubmit() {
    let newUser = this.createUser(this.form)
    if (newUser !== null) {
      this.service.addUser(newUser).subscribe({
        next: () => {
          console.log("Registration success")
          this.status.message = 'success'
          setTimeout(() => {this.router.navigate(['/home']);}, 10000);
        },
        error: (err) => 
        {
          this.status.isError = true
          this.status.message = err.error
        }
      })
    }
    else {
      this.status.isError = true
      setTimeout(() => {this.status.isError = false}, 3000);
    }
  }

  createUser(form: any) {

    let user = {
      name: form.name,
      username: form.username,
      email: form.email,
      password: form.password
    }
    return this.userIsValid(user) ? user : null
  }

  userIsValid(user: any): boolean {
    if (user.name !== null || user.username !== null || user.email !== null || user.password !== null) {
      return true
    }
    return false
  }
}
