import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../shared.service';
import { Event } from '../models/event.model'

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})

export class NewEventComponent implements OnInit {

  response = { state: 'Undefined', body: '' }

  form = { id: 0, description: '', location: '', category: '', eventStart: '', eventEnd: '', tickets: 1, about: '', imgSource: '' }

  event?: Event;
  id = this.activatedRoute.snapshot.paramMap.get('id');

  constructor(private service: EventService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    let img = <HTMLImageElement>document.getElementById('avatar');
    if (this.id) {
      this.service.getEvent(this.id).subscribe({
        next: (data: any) => {
          console.log("Success get", data)
          this.form.id = data.id
          this.form.description = data.description
          this.form.location = data.location
          this.form.category = data.category
          this.form.eventStart = data.eventStart
          this.form.eventEnd = data.eventEnd
          this.form.tickets = data.numberOfTickets
          this.form.about = data.about
          this.form.imgSource = data.imgSource
          img.src = data.imgSource
        },
        error: (err) => console.log(err)
      })
    }
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
      category: this.form.category,
      eventStart: this.form.eventStart,
      eventEnd: this.form.eventEnd,
      numberOfTickets: this.form.tickets,
      about: this.form.about,
      imgSource: this.form.imgSource
    }
    return this.eventIsValid(event) ? event : null
  }

  eventIsValid(event: any): boolean {
    if (event.description !== null || event.location !== null ||
      event.category !== null || event.eventStart !== null ||
      event.eventStart !== null || event.tickets !== null ||
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

}
