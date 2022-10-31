import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  close = new EventEmitter<void>();

  form = {name: '', username:'', email: '', password: ''}
  constructor() {

  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.form);
  }
}