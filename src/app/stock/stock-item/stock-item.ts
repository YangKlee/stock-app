import { Component, Input } from '@angular/core';
import {Stock} from '../../model/stock';
import { StockService } from '../../services/stock-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-stock-item',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './stock-item.html',
  styleUrl: './stock-item.css',
})
export class StockItem {

  constructor(private StockServices: StockService, private router:Router) {}
  // nhận stock từ cha là stockList, property đó là có thể được bind từ bên ngoài
  // ! chắc chắn rằng nó không null
  @Input() stock!: Stock;
  
  isHover: Boolean = false;
  addFavorite(stock: Stock)
  {
    this.StockServices.toggleFavourite(stock);
  }
  deleteStock(stock: Stock)
  {
    this.StockServices.deleteStock(stock.id).subscribe(
      (success: any) =>
      {
        alert(success.msg);
        //this.router.navigate(["stocklist"]);
        this.StockServices.isReloadStockData.next(true);
      },
      (err: any) =>
      {
        alert(err.msg);
      }
    )
    this.StockServices.isReloadStockData.next(true);
    // if(this.StockServices.deleteStock(stock.code))
    //   alert("Xóa stock thành công");
    // else
    //   alert("Xóa stock không thành công");
  }
  viewDetial(stock: Stock)
  {
    this.router.navigate(["/stocklist/chitiet", stock.id]);
  }
  modifyStock(stock: Stock)
  {
    this.router.navigate(["/stocklist/edit", stock.id]);
    //this.StockServices.modifyStockCode.next(stock.id);
  }
}
