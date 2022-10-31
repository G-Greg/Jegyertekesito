import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {

  form = { description: '', location: '', category: null, startDate: null, about: '', tickets: 1, endDate: null }

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.form)
  }

}