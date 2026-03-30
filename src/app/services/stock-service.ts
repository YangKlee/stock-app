//  import { Observable } from "rxjs/Observable"; not work in new version
import { Observable } from "rxjs";
// import {_throw as ObservableThrow} from "rxjs/observable/throw" not work in new version
import { throwError } from "rxjs";
//import { of as ObservableOf } from 'rxjs/observable/of'; not work in new version
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Stock } from '../model/stock';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class StockService {
  public stockList: Array<Stock> = [];
  public selectedStockCode = new BehaviorSubject<string>("");
  public modifyStockCode = new BehaviorSubject<string>("");
  constructor()
  {
    this.stockList = [
      new Stock("HDPE là ngon luôn", "HDPE", 85,80, "VNINDEX"),
      new Stock("67 Coin", "67", 100,10, "NAPAS")
    ];
  }
  // of = wrap value thành Observable
  // mọi function đều phải trả về dữ liệu dưới dạng bất đồng bộ
  getAllStock() : Observable<Stock[]>
  {
    return of(this.stockList);
  }
  getStock(code: string): Observable<any>
  {
    let searchStock = this.stockList.find(e => e.code == code);
    return of(searchStock);
  }
  // return về code
  // báo thành công hay k
  createStock(newStock: Stock): Observable<any>
  {
    // // nếu hong tìm thấy -> hong có bị trùng
    // if(this.getStock(newStock.code) == undefined)
    // {
    //   this.stockList.push(newStock);
    //   return true;
    // }
    // return false;
    let foundStock = this.stockList.find(e => e.code == newStock.code);
    if(foundStock)
    {
      return throwError(() => ({ msg: "Stock đã tồn tại rồi má!" }));
    }
    else
    {
      this.stockList.push(newStock);
      return of({ msg: "Thêm stock thành công!" });
    }
  }
  modifyStock(newStock: Stock): Observable<any>
  {

    let i = this.stockList.findIndex(e => e.code == newStock.code);
    if(i == undefined)
      return throwError(() => ({ msg: "Ủa alo, Hông tìm thấy stock cần sửa" }));
    else
    {
      this.stockList[i] = newStock;
      return of({ msg: "Sửa stock thành công ròi nè!" });
    }
  }
  deleteStock(stockCode: string): Observable<any>
  {
    let i = this.stockList.findIndex(e => e.code == stockCode);
    if(i == undefined)
      return throwError(() => ({ msg: "Ủa alo, Hông tìm thấy stock cần xóa" }));
    else
    {
      // hàm splice dùng để chèn, xóa phần tử
      // splice(<vị trí action>, <số lượng phần tử bị tác động>, ...)
      this.stockList.splice(i, 1);
      return of({ msg: "Xóa stock thành công!" });
    }

  }
}
