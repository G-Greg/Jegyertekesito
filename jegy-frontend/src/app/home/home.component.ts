import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { EventService } from '../shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  addEventShow = false;
  listView = true;

  events: any = [];

  constructor(private sService: StorageService, private eService: EventService) { }


  ngOnInit(): void {
    let user = this.sService.getUser();
    if (user) {
      user.username === "admin" ? this.addEventShow = true : this.addEventShow = false
    }

    this.eService.getEvents().subscribe(resposnse => {
      this.events = resposnse;
    })
  }

}
