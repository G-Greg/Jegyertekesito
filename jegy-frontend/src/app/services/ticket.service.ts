import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class TicketService {
    private readonly API_URL = "https://localhost:7211/";

    constructor(private http: HttpClient) { }
    getTickets(): Observable<any> {
        return this.http.get(this.API_URL + 'api/tickets');
    }

    getTicket(value: any) {
        return this.http.get(this.API_URL + 'api/tickets/' + value);
    }

    addTicket(value: any) {
        return this.http.post(this.API_URL + 'api/tickets', value);
    }

    updateTicket(value: any) {
        return this.http.put(this.API_URL + 'api/tickets/' + value.id, value.ticket);
    }

    buyTicket(value: any){
        return this.http.put(this.API_URL + 'api/tickets/buy/' + value.id, value.data);
    }

    deleteTicket(value: any) {
        return this.http.delete(this.API_URL + 'api/tickets/' + value);
    }
}