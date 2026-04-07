import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpServices {
  private API_SERVER="http://172.50.194.33:3000";
  private URL_STOCK=`${this.API_SERVER}/stocks`
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
}


