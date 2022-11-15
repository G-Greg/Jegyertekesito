import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService, TicketService } from '../shared.service';
import { Event } from '../models/event.model'
import { Ticket } from '../models/ticket.model'
@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})

export class NewEventComponent implements OnInit {

  response = { state: 'Undefined', body: '' }

  form = {
    id: 0,
    ticketId: 0,
    description: '',
    location: '',
    category: {
      earlyBird: { db: 0, price: 0 },
      lastMinute: { db: 0, price: 0 },
      normal: { db: 0, price: 0 },
      VIP: { db: 0, price: 0 },
    },
    eventStart: '', eventEnd: '',
    tickets: 0,
    price: 0,
    about: '',
    imgSource: ''
  }

  event?: Event;
  ticket: Ticket = { id: 0, eventId: 0, earlyBird: 0, earlyBirdPrice: 0, lastMinute: 0, lastMinutePrice: 0, normal: 0, normalPrice: 0, VIP: 0, VIPPrice: 0 };
  id = this.activatedRoute.snapshot.paramMap.get('id');

  constructor(private service: EventService, private refactorService: TicketService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    let img = <HTMLImageElement>document.getElementById('avatar');
    if (this.id) {
      this.service.getEvent(this.id).subscribe({
        next: (data: any) => {
          this.getTickets(data.ticketId)
          this.form.id = data.id
          this.form.ticketId = data.ticketId
          this.form.description = data.description
          this.form.location = data.location
          this.form.eventStart = data.eventStart
          this.form.eventEnd = data.eventEnd

          this.form.about = data.about
          this.form.imgSource = data.imgSource
          img.src = data.imgSource
        },
        error: (err) => {
          this.response.state = 'Fail'
          this.response.body = 'Error during load the event: ' + err.message
          console.log(err)
        }
      })
    }
  }

  handleCategory(event: any) {
    switch (event.value) {
      case "early bird":
        this.form.tickets = this.form.category.earlyBird.db
        this.form.price = this.form.category.earlyBird.price
        break;
      case "last minute":
        this.form.tickets = this.form.category.lastMinute.db
        this.form.price = this.form.category.lastMinute.price
        break;
      case "normal":
        this.form.tickets = this.form.category.normal.db
        this.form.price = this.form.category.normal.price
        break;
      case "VIP":
        this.form.tickets = this.form.category.VIP.db
        this.form.price = this.form.category.VIP.price
        break;
    }
  }

  handleTicketProps(input: any) {
    switch (input.value) {
      case "early bird":
        this.form.category.earlyBird.db = this.form.tickets
        this.form.category.earlyBird.price = this.form.price
        break;
      case "last minute":
        this.form.category.lastMinute.db = this.form.tickets
        this.form.category.lastMinute.price = this.form.price
        break;
      case "normal":
        this.form.category.normal.db = this.form.tickets
        this.form.category.normal.price = this.form.price
        break;
      case "VIP":
        this.form.category.VIP.db = this.form.tickets
        this.form.category.VIP.price = this.form.price
        break;
    }
  }

  async onSubmit() {
    if (this.id) {
      let newEvent = await this.updateEvent()
      if (newEvent) {
        this.service.updateEvent({ id: this.id, event: newEvent }).subscribe({
          next: () => {
            this.response.state = 'Success'
            this.response.body = 'Successfully updated the event'
          },
          error: (err) => {
            console.log(err)
            this.response.state = 'Fail'
            this.response.body = 'Error during update: ' + err.message
          }
        })
      }
    }
    else if (!this.id) {
      let newEvent = await this.createEvent()
      if (newEvent) {
        this.service.addEvent(newEvent).subscribe({
          next: (data) => {
            this.response.state = 'Success'
            this.response.body = 'Successfully created an event'
            console.log("Created event:", data)
          },
          error: (err) => {
            this.response.state = 'Fail'
            this.response.body = 'Error during create event: ' + err.message
            console.log(err)
          }
        })
      }
    }
  }

  async updateEvent() {
    await this.updateTicket()
    let event: Event = {
      id: this.form.id,
      ticketId: this.form.ticketId,
      description: this.form.description,
      location: this.form.location,
      eventStart: this.form.eventStart,
      eventEnd: this.form.eventEnd,
      about: this.form.about,
      imgSource: this.form.imgSource
    }
    return this.eventIsValid(event) ? event : null
  }

  async createEvent() {
    await this.createTicket()
    let event: Event = {
      id: this.form.id,
      ticketId: this.form.ticketId,
      description: this.form.description,
      location: this.form.location,
      eventStart: this.form.eventStart,
      eventEnd: this.form.eventEnd,
      about: this.form.about,
      imgSource: this.form.imgSource
    }
    return this.eventIsValid(event) ? event : null
  }

  eventIsValid(event: any): boolean {
    return this.isAllValid([event.description, event.location,
    event.eventStart, event.ticketId,
    event.eventStart, event.about, event.imgSource])
  }

  onUploadPhoto(event: any) {
    var uploadedImg: any = "";
    var image = <HTMLImageElement>document.getElementById('avatar');
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      uploadedImg = reader.result;
      image.src = uploadedImg;
      this.form.imgSource = uploadedImg
    });
    reader.readAsDataURL(event.target.files[0]);
  }

  getTickets(id: number) {
    this.refactorService.getTicket(id).subscribe({
      next: (data: any) => {
        this.ticket.id = data.id
        this.form.category.earlyBird.db = data.earlyBird
        this.form.category.earlyBird.price = data.earlyBirdPrice
        this.form.category.lastMinute.db = data.lastMinute
        this.form.category.lastMinute.price = data.lastMinutePrice
        this.form.category.normal.db = data.normal
        this.form.category.normal.price = data.normalPrice
        this.form.category.VIP.db = data.vip
        this.form.category.VIP.price = data.vipPrice
        console.log("Success get event & ticket")
      },
      error: (err) => {
        this.response.state = 'Fail'
        this.response.body = 'Error during load the ticket: ' + err.message
        console.log(err)
      }
    })
  }


  async updateTicket() {
    return new Promise((resolve, reject) => {
      let newTicket: Ticket = {
        id: this.ticket.id,
        eventId: this.form.id,
        earlyBird: this.form.category.earlyBird.db,
        earlyBirdPrice: this.form.category.earlyBird.price,
        lastMinute: this.form.category.lastMinute.db,
        lastMinutePrice: this.form.category.lastMinute.price,
        normal: this.form.category.normal.db,
        normalPrice: this.form.category.normal.price,
        VIP: this.form.category.VIP.db,
        VIPPrice: this.form.category.VIP.price
      }

      if (this.ticketIsValid(newTicket)) {
        this.refactorService.updateTicket({ id: this.ticket.id, ticket: newTicket }).subscribe({
          next: (data: any) => {
            this.response.state = 'Success'
            this.response.body = 'Successfully updated the ticket'
            console.log("Success update a ticket")
            resolve(data)
          },
          error: (err) => {
            this.response.state = 'Fail'
            this.response.body = 'Error during update the ticket: ' + err.message
            console.log(err)
            reject()
          }
        })
      }
      else {
        console.log("invalid ticket")
      }
    });
  }


  async createTicket() {
    return new Promise((resolve, reject) => {
      let newTicket: Ticket = {
        id: 0,
        eventId: this.form.id,
        earlyBird: this.form.category.earlyBird.db,
        earlyBirdPrice: this.form.category.earlyBird.price,
        lastMinute: this.form.category.lastMinute.db,
        lastMinutePrice: this.form.category.lastMinute.price,
        normal: this.form.category.normal.db,
        normalPrice: this.form.category.normal.price,
        VIP: this.form.category.VIP.db,
        VIPPrice: this.form.category.VIP.price
      }

      if (this.ticketIsValid(newTicket)) {
        this.refactorService.addTicket(newTicket).subscribe({
          next: (data: any) => {
            this.form.ticketId = data.id
            this.response.state = 'Success'
            this.response.body = 'Successfully created the ticket'
            console.log("Success create a ticket")
            console.log(data.id)
            resolve(data.id)
          },
          error: (err) => {
            this.response.state = 'Fail'
            this.response.body = 'Error during load the ticket: ' + err.message
            console.log(err)
            reject()
          }
        })
      }
      else {
        console.log("invalid ticket")
      }
    });
  }

  ticketIsValid(ticket: Ticket): boolean {
    return this.isAllValid([ticket.eventId, ticket.earlyBird, ticket.earlyBirdPrice,
    ticket.lastMinute, ticket.lastMinutePrice, ticket.normal,
    ticket.normalPrice, ticket.VIP, ticket.VIPPrice])
  }

  isAllValid(array: Array<any>) {
    return array.every(prop =>
      this.isValid(prop)
    );
  }

  isValid(prop: any): boolean {
    return prop !== undefined && prop !== null && prop !== NaN
  }

}
