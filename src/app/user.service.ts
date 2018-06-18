import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
isUserLoggedIn: boolean;
private pseudonyme;
  constructor() {
    this.isUserLoggedIn = false;
   }
   setUserLoggedIn() {
     this.isUserLoggedIn = true;
     return this.isUserLoggedIn;
   }
   getUserLoggedIn() {
     this.isUserLoggedIn;
     return this.isUserLoggedIn;
   }
}
