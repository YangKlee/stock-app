//  import { Observable } from "rxjs/Observable"; not work in new version
import { Observable } from "rxjs";
// import {_throw as ObservableThrow} from "rxjs/observable/throw" not work in new version
import { throwError } from "rxjs";
//import { of as ObservableOf } from 'rxjs/observable/of'; not work in new version
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Stock } from '../model/stock';
import { BehaviorSubject } from 'rxjs';
import { HttpServices } from "./http-services";
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class StockService {
  public stockList: Array<Stock> = [];
  public selectedStockCode = new BehaviorSubject<number>(-1);
  public modifyStockCode = new BehaviorSubject<number>(-1);
  public isReloadStockData = new BehaviorSubject<Boolean>(false);
  constructor(private httpServices: HttpServices)
  {
  this.stockList = [
    // new Stock(,"Hòa Phát Group", "HPG", 28500, 28000, "VNINDEX"),
    // new Stock("Vingroup", "VIC", 72000, 71000, "VNINDEX"),
    // new Stock("Vinamilk", "VNM", 68000, 69000, "VNINDEX"),
    // new Stock("FPT Corporation", "FPT", 95000, 94000, "VNINDEX"),

    // new Stock("Reliance Industries", "RELIANCE", 2500, 2450, "NSE"),
    // new Stock("Tata Consultancy", "TCS", 3600, 3550, "NSE"),
    // new Stock("Infosys", "INFY", 1500, 1480, "NSE"),

    // new Stock("Apple Inc.", "AAPL", 190, 185, "NYSE"),
    // new Stock("Microsoft", "MSFT", 420, 410, "NYSE"),
    // new Stock("Tesla", "TSLA", 210, 205, "NYSE"),
  ];
  }
  // of = wrap value thành Observable
  // mọi function đều phải trả về dữ liệu dưới dạng bất đồng bộ
  getAllStock() : Observable<Stock[]>
  {
    
      let data= this.httpServices.getStock().pipe(
        map((rawData: any[]) =>
          rawData.  map((e: any) =>
            new Stock(
              e.id,
              e.name,
              e.code,
              e.price,
              e.previousPrice,
              e.exchange
            )
          )
        )
      );
      data.subscribe((e: Stock[])=>{
        this.stockList = e;
      })
      return data;
          
  }
  getStock(id: number): Observable<Stock> {
    return this.httpServices.getStockById(id).pipe(
      map(e => new Stock(
        id,
        e.name,
        e.code,
        e.price,
        e.previousPrice,
        e.exchange
      ))
    );
  }
  // return về code
  // báo thành công hay k
  createStock(newStock: Stock): Observable<any>
  {
    const body = {
      "id": newStock.id,
      "name": newStock.name,
      "code": newStock.code,
      "price": newStock.price,
      "previousPrice": newStock.previousPrice,
      "exchange": newStock.exchange,
      "favorite": newStock.favourite,
    };
    return this.httpServices.postStock(body);
  }
  modifyStock(newStock: Stock, id: number): Observable<any>
  {
    const body = {
      "id": newStock.id,
      "name": newStock.name,
      "code": newStock.code,
      "price": newStock.price,
      "previousPrice": newStock.previousPrice,
      "exchange": newStock.exchange,
      "favorite": newStock.favourite,
    };
    return this.httpServices.updateStock(id, body);
  }
  deleteStock(stockID: number): Observable<any>
  {

    return this.httpServices.deleteStock(stockID);
    
  }
  searchStock(keyword: String): Observable<Stock[]>
  {
    return of(this.stockList.filter(e => 
      e.name.toLowerCase().includes(keyword.toLowerCase())
      || e.code.toLowerCase().includes(keyword.toLowerCase())
    ))
  }
  toggleFavourite(stock: Stock)
  {
    if(stock.isFavourite)
    {
      this.httpServices.farvoriteStock(stock.id, false);
    }
    else
    {
      this.httpServices.farvoriteStock(stock.id, true);
    }
    this.isReloadStockData.next(true);
  }
}
