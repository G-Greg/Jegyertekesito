import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Event } from '../models/event.model';
import { StorageService } from '../services/storage.service';
import { faPen, faTrash, faLocationDot, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { EventService } from '../services/event.service';

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

  constructor(private eService: EventService, private sService: StorageService, private router: Router) { }

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

}
