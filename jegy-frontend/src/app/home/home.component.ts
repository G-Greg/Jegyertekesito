import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { EventService } from '../shared.service';
import { faPen, faTrash, faLocationDot, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { Event } from '../models/event.model'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  faPen = faPen;
  faTrash = faTrash;
  faLocation = faLocationDot;
  faCalendar = faCalendarDay;

  addEventShow = false;
  listView = true;

  events: Event[] = [];

  constructor(private router: Router, private sService: StorageService, private eService: EventService) { }


  ngOnInit(): void {
    let user = this.sService.getUser();
    if (user) {
      user.username === "admin" ? this.addEventShow = true : this.addEventShow = false
    }

    this.eService.getEvents().subscribe(resposnse => {
      this.events = resposnse.sort((a: Event, b: Event) => (a.eventStart > b.eventStart) ? 1 : -1);
    })
    //sort by date
  }

  onSelect(event: Event) {
    this.router.navigate(['/event/edit/', event.id]);
  }

  onDelete(event: Event){
    this.eService.deleteEvent(event.id).subscribe({
      next: (data) => {
        console.log("Deleted", data)
        window.location.reload()
      },
      error: (err) => console.log(err)
    })
  }

}
