import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Event } from '../models/event.model'
import { Ticket } from '../models/ticket.model';
import { TicketService } from '../shared.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  @Output()
  close = new EventEmitter<void>();


  @Input()
  event: any;

  tickets: any[] = [];



  constructor(private tService: TicketService) {
   }

  ngOnInit(): void {


    //image.src = this.event?.imgSource || ""
    //get tickets

    this.tService.getTicket(this.event?.ticketId).subscribe({
      next: (data: any) => {
        this.fillTicketsArray(data)
        console.log("Success ticket")
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
    this.tickets.push({ name: "Early Bird", db: data.earlyBird, price: data.earlyBirdPrice })
    this.tickets.push({ name: "Last Minute", db: data.lastMinute, price: data.lastMinutePrice })
    this.tickets.push({ name: "Normal", db: data.normal, price: data.normalPrice })
    this.tickets.push({ name: "VIP", db: data.vip, price: data.vipPrice })
  }
}
