import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, Observer, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  loginUser: string = "";
  constructor(private userServices: User){}
  login()
  {
    
  }
}
