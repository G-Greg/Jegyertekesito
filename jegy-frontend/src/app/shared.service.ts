import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class UserService {
    private readonly API_URL = "https://localhost:7211/";

    constructor(private http: HttpClient) { }
    getUsers(): Observable<any> {
        return this.http.get(this.API_URL + 'api/users');
    }

    getUser(value: any) {
        return this.http.get(this.API_URL + 'api/users/' + value)
    }

    addUser(value: any) {
        return this.http.post(this.API_URL + 'api/users', value);
    }

    updateUser(value: any) {
        return this.http.put(this.API_URL + 'api/users', value);
    }

    deleteUser(value: any) {
        return this.http.delete(this.API_URL + 'api/users', value);
    }

    login(value: any) {
        return this.http.post(this.API_URL + 'api/users/login', value)
    }
}

@Injectable({
    providedIn: 'root'
})

export class EventService {
    readonly API_URL = "https://localhost:7211/";

    constructor(private http: HttpClient) { }
    getEvents(): Observable<any> {
        return this.http.get(this.API_URL + 'api/events');
    }

    addEvent(value: any) {
        return this.http.post(this.API_URL + 'api/events', value);
    }

    updateEvent(value: any) {
        return this.http.put(this.API_URL + 'api/events', value);
    }

    deleteEvent(value: any) {
        return this.http.delete(this.API_URL + 'api/events', value);
    }
}
