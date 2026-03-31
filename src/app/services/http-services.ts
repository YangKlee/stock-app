import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpServices {
  private API_SERVER="http://localhost:3000";
  private URL_STOCK=`${this.API_SERVER}/stocks`
  private httpOptions={
    headers: new HttpHeaders({
        'Content-Type': "application/json",
    }),
  };
  constructor(private httpClient: HttpClient){}
  public getStock(): Observable<any>
  {
    return this.httpClient.get<any>(this.URL_STOCK, this.httpOptions);
  }

}
