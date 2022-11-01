import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/shared.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private service: UserService) { }

  Users: any = [];

  ngOnInit(): void {
    this.service.getUsers().subscribe(data => {
      console.log(data)
      this.Users = data;
    });
  }

}
