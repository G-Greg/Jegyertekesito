import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class UserService {
    readonly API_URL = "https://localhost:7211/";

    constructor(private http: HttpClient) { }
    getUsers(): Observable<any> {
        return this.http.get(this.API_URL + 'api/users');
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
}

@Injectable({
    providedIn: 'root'
})

export class EventService {
    readonly API_URL = "http://localhost:4200/";

    constructor(private http: HttpClient) { }
    getUsers(): Observable<any> {
        return this.http.get(this.API_URL + 'api/users');
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
}
