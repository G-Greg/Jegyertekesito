import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../models/event.model'
import { Ticket } from '../models/ticket.model';
import { TicketService } from '../services/ticket.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  @Output()
  close = new EventEmitter<void>();

  showLoginErr = false;

  @Input()
  event: any;

  tickets: any[] = [];


  constructor(private tService: TicketService, private sService: StorageService, private router: Router) {
  }

  ngOnInit(): void {

    this.tService.getTicket(this.event?.ticketId).subscribe({
      next: (data: any) => {
        this.fillTicketsArray(data)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  initShow(outputs: { close: (...args: any[]) => any }) {
    this.close.subscribe(outputs["close"]);
  }

  fillTicketsArray(data: any) {
    data.earlyBird > 0 ? this.tickets.push({ id: data.id, name: "Early Bird", db: data.earlyBird, price: data.earlyBirdPrice }) : null
    data.lastMinute > 0 ? this.tickets.push({ id: data.id, name: "Last Minute", db: data.lastMinute, price: data.lastMinutePrice }) : null
    data.normal > 0 ? this.tickets.push({ id: data.id, name: "Normal", db: data.normal, price: data.normalPrice }) : null
    data.vip > 0 ? this.tickets.push({ id: data.id, name: "VIP", db: data.vip, price: data.vipPrice }) : null
  }

  toSummaryPage(category: string) {
    if (this.userIsLogged()) {
      this.close.emit()
      this.router.navigate(['event', this.event.id, 'category', category, 'summary']);
    }
    else{
      this.showLoginErr = true;
    }
  }

  userIsLogged(): boolean {
    return this.sService.getUser() ? true : false
  }
}
