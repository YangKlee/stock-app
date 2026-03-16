import { Injectable } from '@angular/core';
import { Stock } from '../model/stock';
@Injectable({
  providedIn: 'root',
})
export class StockService {
  public stockList: Array<Stock> = [];
  constructor()
  {
    this.stockList = [
      new Stock("HDPE là ngon luôn", "HDPE", 85,80, "VNINDEX"),
      new Stock("67 Coin", "67", 100,10, "NAPAS")
    ];
  }
  getAllStock() : Array<Stock>
  {
    return this.stockList;
  }
  getStock(code: string): Stock | undefined
  {
    let searchStock = this.stockList.find(e => e.code == code);
    return searchStock;
  }
  // return về code
  // báo thành công hay k
  createStock(newStock: Stock): boolean
  {
    // nếu hong tìm thấy -> hong có bị trùng
    if(this.getStock(newStock.code) == undefined)
    {
      this.stockList.push(newStock);
      return true;
    }
    return false;
  }
}
