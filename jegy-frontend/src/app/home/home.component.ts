import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  addEventShow = false;
  constructor(private sService: StorageService) { }


  ngOnInit(): void {
    let user = this.sService.getUser();
    if (user)
    {
      user.username === "admin" ? this.addEventShow = true : this.addEventShow = false
    }
  }

}
