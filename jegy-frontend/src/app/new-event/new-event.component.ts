import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {

  form = { description: '', location: '', category: null, startDate: null, endDate: null, tickets: 1, about: ''}

  constructor(private service: EventService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let newEvent = this.createEvent()
    console.log(newEvent)
    this.service.addEvent(newEvent).subscribe({
      next: () => console.log("Created"), 
      error: (err) => console.log(err)
    })
  }

  createEvent(){
    let event = {
      description: this.form.description,
      location: this.form.location,
      category: this.form.category,
      startDate: this.form.startDate,
      endDate: this.form.endDate,
      tickets: this.form.tickets,
      about: this.form.about
    }

    return this.eventIsValid(event) ? event : null
  }

  eventIsValid(event: any): boolean {
    if (event.description !== null || event.location !== null ||
       event.category !== null || event.startDate !== null ||
       event.endDate !== null || event.tickets !== null || event.about !== null ) {
      return true
    }
    return false
  }

}
