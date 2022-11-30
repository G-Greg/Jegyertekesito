import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Event } from '../models/event.model';
import { StorageService } from '../services/storage.service';
import { faCalendarDay, faLocationDot, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { TicketsComponent } from '../tickets/tickets.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  @Output()
  close = new EventEmitter<void>();

  @Input()
  events: Event[] = [];

  userIsAdmin = false;

  faPen = faPen;
  faTrash = faTrash;
  faLocation = faLocationDot;
  faCalendar = faCalendarDay;

  constructor(private eService: EventService, private sService: StorageService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    let user = this.sService.getUser();
    if (user) {
      user.username === "admin" ? this.userIsAdmin = true : this.userIsAdmin = false
    }
  }

  initShow(outputs: { close: (...args: any[]) => any }) {
    this.close.subscribe(outputs["close"]);
  }

  onSelect(event: Event) {
    this.close.emit()
    this.router.navigate(['/event/edit/', event.id]);
  }

  onDelete(event: Event) {
    this.eService.deleteEvent(event.id).subscribe({
      next: (data) => {
        console.log("Deleted", data)
        window.location.reload()
      },
      error: (err) => console.log(err)
    })
  }

  showTicketsOfEvent(thisEvent: any) {
    this.close.emit()
    let login = this.modalService.open(TicketsComponent, { backdrop: 'static', centered: true, size: 'lg' });
    (login.componentInstance as TicketsComponent).initShow({ close: () => login.close() });
    login.componentInstance.event = thisEvent
  }
}
