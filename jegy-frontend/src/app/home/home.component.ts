import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { EventService } from '../services/event.service';
import { faPen, faTrash, faLocationDot, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { Event } from '../models/event.model'
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TicketsComponent } from '../tickets/tickets.component';

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

  constructor(private router: Router, private sService: StorageService, private eService: EventService, private modalService: NgbModal) { }


  ngOnInit(): void {
    let user = this.sService.getUser();
    if (user) {
      user.username === "admin" ? this.addEventShow = true : this.addEventShow = false
    }

    this.eService.getEvents().subscribe({
      next: (response) => {
        this.events = response.sort((a: Event, b: Event) => (a.eventStart > b.eventStart) ? 1 : -1);
      },
      error: (err) => {
        console.log(err)
      }
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

  showEvent(thisEvent: any){
      let login = this.modalService.open(TicketsComponent, { backdrop: 'static', centered: true, size: 'xl' });
      (login.componentInstance as TicketsComponent).initShow({ close: () => login.close() });
      login.componentInstance.event = thisEvent
  }

}
