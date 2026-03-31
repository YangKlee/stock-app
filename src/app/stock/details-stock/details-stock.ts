import { Component, Input, OnInit } from '@angular/core';
import { Stock } from '../../model/stock';
import { StockService } from '../../services/stock-service';
@Component({
  selector: 'app-details-stock',
  imports: [],
  templateUrl: './details-stock.html',
  styleUrl: './details-stock.css',
})
export class DetailsStock implements OnInit {
  @Input() StockData!: Stock;
  constructor(public stockServices: StockService){}
  stockSelect: Stock = new Stock(0,"", "", 0, 0, "");
  ngOnInit(): void {
    // đảm bảo load xong html mới đc gán value từ cha
    this.stockSelect = this.StockData;
  }
  closeDialog()
  {
    this.stockServices.selectedStockCode.next("");
    console.log("Close detais form!");
  }
}
