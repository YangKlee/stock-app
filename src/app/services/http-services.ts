import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {User} from '../model/user'
@Injectable({
  providedIn: 'root',
})
export class HttpServices {
  private API_SERVER="http://localhost:3000";
  private URL_STOCK=`${this.API_SERVER}/stocks`
  private URL_USER=`${this.API_SERVER}/user`
  private httpOptions={
    headers: new HttpHeaders({
        'Content-Type': "application/json",
    }),
  };
  constructor(private httpClient: HttpClient){}
  public getStock(): Observable<any>
  {
    console.log(this.httpClient.get<any>(this.URL_STOCK, this.httpOptions));
    return this.httpClient.get<any>(this.URL_STOCK, this.httpOptions);
  }
  public postStock(body: any): Observable<any>
  {
    return this.httpClient.post<any>(this.URL_STOCK,body, this.httpOptions);
  }
  public deleteStock(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.URL_STOCK}/${id}`, this.httpOptions);
  }
  public updateStock(id: string, body: any): Observable<any> {
    return this.httpClient.put<any>(`${this.URL_STOCK}/${id}`, body, this.httpOptions);
  }
  public getStockById(id: string)
  {
    return this.httpClient.get<any>(`${this.URL_STOCK}/${id}`, this.httpOptions);
  }
  public farvoriteStock(id: number, isFavorite: Boolean)
  {
    return this.httpClient.patch<any>(`${this.URL_STOCK}/${id}`,{"favorite": isFavorite}, this.httpOptions)
  }
  public verifyLogin(username: String, password: String): Observable<User[]>
  {
    return this.httpClient.get<User[]>(`${this.URL_USER}/?username=${username}&password=${password}`, this.httpOptions);
  }
  public addUser(body: any): Observable<any>
  {
    return this.httpClient.post(this.URL_USER,body, this.httpOptions)
  }
  public pathToken(UID: String, strToken: String): Observable<any>
  {
    return this.httpClient.patch<any>(`${this.URL_USER}/${UID}`, {"token": strToken}, this.httpOptions);
  }
}


