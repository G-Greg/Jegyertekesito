import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService, TicketService } from '../shared.service';
import { Event } from '../models/event.model'

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
    console.log(this.form.category)
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
    console.log(event.value)
  }

  onSubmit() {
    let newEvent = this.createEvent()
    console.log(newEvent)

    if (newEvent && this.id) {
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
    else if (newEvent && !this.id) {
      this.service.addEvent(newEvent).subscribe({
        next: (data) => {
          this.response.state = 'Success'
          this.response.body = 'Successfully created an event'
          console.log("Created", data)
        },
        error: (err) => {
          this.response.state = 'Fail'
          this.response.body = 'Error during create event: ' + err.message
          console.log(err)
        }
      })

    }
  }

  createEvent() {
    let event = {
      id: this.form.id,
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
    if (event.description !== null || event.location !== null ||
      event.eventStart !== null ||
      event.eventStart !== null ||
      event.about !== null || event.imgSource !== null) {
      return true
    }
    return false
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
        this.form.category.earlyBird.db = data.earlyBird,
        this.form.category.earlyBird.price = data.earlyBirdPrice,
        this.form.category.lastMinute.db = data.lastMinute,
        this.form.category.lastMinute.price = data.lastMinutePrice,
        this.form.category.normal.db = data.normal,
        this.form.category.normal.price = data.normalPrice,
        this.form.category.VIP.db = data.vip,
        this.form.category.VIP.price = data.vipPrice,
        console.log("Success get event & ticket")
      },
      error: (err) => {
        this.response.state = 'Fail'
        this.response.body = 'Error during load the ticket: ' + err.message
        console.log(err)
      }
    })
  }

}
