import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {
  PhotoFileName: string = '';
  PhotoFilePath: string = '';
  form = { description: '', location: '', category: null, eventStart: null, eventEnd: null, tickets: 1, about: '', imgSource: '' }

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

  createEvent() {
    let event = {
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
    var avatar = <HTMLImageElement> document.getElementById('avatar');
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      uploadedImg = reader.result;
      avatar.src = uploadedImg;
      this.form.imgSource = uploadedImg
    });
    reader.readAsDataURL(event.target.files[0]);
    
    /*var canvas = <HTMLCanvasElement>document.getElementById("mycanvas");
    const dataURL = canvas.toDataURL();
    debugger*/
    
    
    
    /*const reader = new FileReader();
    var uploadedImg: any = "";
    var profilePic = new Image;
    var avatar = document.getElementById('avatar');
    reader.addEventListener("load", () => {
      uploadedImg = reader.result;
      profilePic.src = uploadedImg;
      avatar.src = uploadedImg;
    });
    reader.readAsDataURL(this.files[0]);*/
    
    
    
    
    
    
    /*var img = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', img, img.name);*/

    /*this.service.uploadPhoto(formData).subscribe((data:any)=>{
      this.PhotoFileName=data.toString();
      this.PhotoFilePath=this.service.PhotoUrl+this.PhotoFileName;
    })*/
  }

}
