import { Injectable } from '@angular/core';

export class StorageService {
    constructor() { }
    
    private readonly KEY = 'user'
    signOut(): void {
        window.sessionStorage.clear();
    }

    public saveUser(user: any): void {
        var item = {name: user.name, username: user.userName, email: user.email}
        window.sessionStorage.removeItem(this.KEY);
        window.sessionStorage.setItem(this.KEY, JSON.stringify(item));
    }

    public getUser(): any {
        const user = window.sessionStorage.getItem(this.KEY);
        if (user) {
          return JSON.parse(user);
        }
        return null;
      }

}