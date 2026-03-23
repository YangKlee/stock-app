import { Component, Input } from '@angular/core';
import {Stock} from '../../model/stock';
import { StockService } from '../../services/stock-service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-stock-item',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './stock-item.html',
  styleUrl: './stock-item.css',
})
export class StockItem {

  constructor(private StockServices: StockService) {}
  // nhận stock từ cha là stockList, property đó là có thể được bind từ bên ngoài
  // ! chắc chắn rằng nó không null
  @Input() stock!: Stock;
  isHover: Boolean = false;
  addFavorite(stock: Stock)
  {
    if(stock.favourite == true)
      stock.favourite = false;
    else
      stock.favourite = true;
  }
  deleteStock(stock: Stock)
  {
    if(this.StockServices.deleteStock(stock.code))
      alert("Xóa stock thành công");
    else
      alert("Xóa stock không thành công");
  }
  viewDetial(stock: Stock)
  {
    this.StockServices.selectedStockCode.next(stock.code);
  }
}
