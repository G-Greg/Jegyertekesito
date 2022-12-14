import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { EventService } from '../services/event.service';
import { faPen, faTrash, faLocationDot, faCalendarDay, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Event } from '../models/event.model'
import { Router } from '@angular/router';
import { NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TicketsComponent } from '../tickets/tickets.component';
import { EventsListComponent } from '../events-list/events-list.component';
import { TicketService } from '../services/ticket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  faLeft = faChevronLeft;
  faRight = faChevronRight;
  faPen = faPen;
  faTrash = faTrash;
  faLocation = faLocationDot;
  faCalendar = faCalendarDay;

  userIsAdmin = false;
  listView = false;

  events: Event[] = [];
  currentYear: number = new Date().getFullYear();
  currentYearEvents: Event[] = [];

  constructor(private router: Router, private sService: StorageService, private tService: TicketService, private eService: EventService, private modalService: NgbModal) { }


  ngOnInit(): void {
    let user = this.sService.getUser();
    if (user) {
      user.username === "admin" ? this.userIsAdmin = true : this.userIsAdmin = false
    }

    this.eService.getEvents().subscribe({
      next: (response) => {
        this.events = response.sort((a: Event, b: Event) => (a.eventStart > b.eventStart) ? 1 : -1);
        this.currentYearEvents = this.getCurrentYearEvents(this.currentYear)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  onSelect(event: Event) {
    this.router.navigate(['/event/edit/', event.id]);
  }

  onDelete(event: Event) {
    this.deleteEvent(event.id);
    this.deleteTicket(event.ticketId);
  }

  deleteEvent(id: number) {
    this.events = this.events.filter(e => e.id !== id)
    this.currentYearEvents = this.currentYearEvents.filter(e => e.id !== id)

    this.eService.deleteEvent(id).subscribe({
      next: (data) => {
        console.log("Deleted event", data)
      },
      error: (err) => console.log(err)
    })
  }

  deleteTicket(id: number) {
    this.tService.deleteTicket(id).subscribe({
      next: (data) => {
        console.log("Deleted ticket", data)
      },
      error: (err) => console.log(err)
    })
  }

  showTicketsOfEvent(thisEvent: any) {
    let login = this.modalService.open(TicketsComponent, { backdrop: 'static', centered: true, size: 'lg' });
    (login.componentInstance as TicketsComponent).initShow({ close: () => login.close() });
    login.componentInstance.event = thisEvent
  }

  showEvents(events: Event[]) {
    let eventList = this.modalService.open(EventsListComponent, { backdrop: 'static', centered: true, size: 'xl' });
    (eventList.componentInstance as EventsListComponent).initShow({ close: () => eventList.close() });
    eventList.componentInstance.events = events
  }


  onDateSelect(event: any) {
    let date = this.formatDate(event)
    let sortedEvents: Event[] = this.searchEvent(date)
    this.showEvents(sortedEvents)
  }

  formatDate(date: any): string {
    let month = ""
    let day = ""

    date.month < 10 ? month = "0" + date.month : month = date.month
    date.day < 10 ? day = "0" + date.day : day = date.day

    return `${date.year}-${month}-${day}`
  }

  searchEvent(date: string): Event[] {
    let sortedEvents: Event[] = []
    sortedEvents = this.events.filter(e => e.eventStart === date)
    return sortedEvents
  }

  isRange(date: NgbDate) {
    let isEvent = false
    let formatedDate = this.formatDate(date)
    this.events.map(e => {
      e.eventStart === formatedDate ? isEvent = true : null
    })
    return isEvent
  }

  prevYear() {
    this.currentYear -= 1
    this.currentYearEvents = this.getCurrentYearEvents(this.currentYear)
  }

  nextYear() {
    this.currentYear += 1
    this.currentYearEvents = this.getCurrentYearEvents(this.currentYear)
  }

  getCurrentYearEvents(currentYear: number): Event[] {
    let sortedEvents: Event[] = []
    sortedEvents = this.events.filter(e => e.eventStart.split("-")[0] === currentYear.toString())
    return sortedEvents
  }
}
