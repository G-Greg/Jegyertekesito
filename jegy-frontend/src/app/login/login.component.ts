import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = {email: '', password: ''}


  @Output()
  close = new EventEmitter<void>();

  constructor() {
  }


  ngOnInit(): void {
  }

  initLogin(outputs: { close: (...args: any[]) => any}) {
    this.close.subscribe(outputs["close"]);
  }

  onSubmit(){
    console.log(this.form, "form")
  }
  signUp(){
    console.log('asd')
  }



}
