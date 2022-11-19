import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from '../models/ticket.model';
import { Event } from '../models/event.model';
import { TicketService } from '../services/ticket.service';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  @Output()
  close = new EventEmitter<void>();

  eventId: number = 0;
  event: Event = { id: 0, ticketId: 0, about: '', description: '', eventStart: '', eventEnd: '', imgSource: '', location: '' }
  category: string = ''
  db: number = 0
  price: number = 0
  summary: number = 0
  ticketNum: number = 1
  alert = { state: 'Undefined', body: '' }

  constructor(private activatedRoute: ActivatedRoute, private eService: EventService, private tService: TicketService) { }

  ngOnInit(): void {
    this.eventId = parseInt(this.activatedRoute.snapshot.paramMap.get('eventId')!);
    this.category = this.activatedRoute.snapshot.paramMap.get('category')!;

    this.getEvent(this.eventId)

  }
  onSubmit() {
    console.log("this.form")
  }

  getEvent(id: number) {
    this.eService.getEvent(id).subscribe({
      next: (response: any) => {
        this.fillEvent(response)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  getTicket(id: number) {
    this.tService.getTicket(id).subscribe({
      next: (response: any) => {
        this.fillTicket(response)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  fillEvent(event: any) {
    this.event.id = event.id
    this.event.ticketId = event.ticketId
    this.event.about = event.about
    this.event.description = event.description
    this.event.eventStart = event.eventStart
    this.event.eventEnd = event.eventEnd
    this.event.location = event.location
    this.event.imgSource = event.imgSource
    this.getTicket(event.ticketId)
  }


  fillTicket(ticket: any) {
    switch (this.category) {
      case "Early Bird":
        this.db = ticket.earlyBird
        this.price = ticket.earlyBirdPrice
        break;
      case "Last Minute":
        this.db = ticket.lastMinute
        this.price = ticket.lastMinutePrice
        break;
      case "Normal":
        this.db = ticket.normal
        this.price = ticket.normalPrice
        break;
      case "VIP":
        this.db = ticket.vip
        this.price = ticket.vipPrice
        break;
    }
    this.summary = this.ticketNum * this.price
  }

  plus() {
    this.ticketNum += 1
    this.calculate()
  }

  minus() {
    this.ticketNum > 1 ? this.ticketNum -= 1 : null
    this.calculate()
  }

  calculate() {
    this.summary = this.ticketNum * this.price
  }

  purchase() {
    if (this.isThereEnoughTicket()) {
      this.tService.buyTicket({ id: this.event.ticketId, data: [this.category, this.ticketNum.toString()] }).subscribe({
        next: () => {
          this.alert.state = 'Success'
          this.alert.body = 'Successfully purchased!'
        },
        error: (err) => {
          console.log(err)
          this.alert.state = 'Fail'
          this.alert.body = 'Error during the purchase: ' + err.message
        }
      })
    }
    else {
      this.alert.state = 'Fail'
      this.alert.body = `Fail: You can't buy that many tickets`
    }
  }

  isThereEnoughTicket(): boolean {
    return this.ticketNum <= this.db ? true : false
  }
}
