import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  form = { description: '', location: '', category: null, startDate: null, about: '', tickets: 1, endDate: null }
  constructor() { }

  ngOnInit(): void {
  }
  
  onSubmit() {
    console.log(this.form)
  }

}
