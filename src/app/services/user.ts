import { Injectable } from '@angular/core';
import { HttpServices } from './http-services';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class User {
  
  constructor(private httpServices: HttpServices){}
  createUser()
  {

  }

}
