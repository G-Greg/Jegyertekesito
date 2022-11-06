import { Component, EventEmitter, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared.service'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  close = new EventEmitter<void>();

  form = { name: null, username: null, email: null, password: null, terms: false }
  constructor(private service: UserService) {

  }

  error: boolean = false

  ngOnInit(): void {
  }

  onSubmit() {
    let newUser = this.createUser(this.form)
    if (newUser !== null) {
      this.service.addUser(newUser).subscribe({
        next: () => console.log("Registration success"),
        error: (err) => alert(err.error)
      })
    }
    else {
      this.error = true
      setTimeout(() => {this.error = false}, 3000);
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
