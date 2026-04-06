import { Component, Input, OnInit } from '@angular/core';
import { Stock } from '../../model/stock';
import { StockService } from '../../services/stock-service';
import { ActivatedRoute, Route } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StockItem } from '../stock-item/stock-item';
import { Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-details-stock',
  imports: [CommonModule],
  templateUrl: './details-stock.html',
  styleUrl: './details-stock.css',
})
export class DetailsStock implements OnInit {
  constructor(public stockServices: StockService,  private route: ActivatedRoute, private router: Router){}
  stockSelect!: Observable<Stock>;
  ngOnInit(): void {
    console.log("Detail stock is loaded");
    // đảm bảo load xong html mới đc gán value từ cha
    //this.stockSelect = this.StockData;
    const idSelected = this.route.snapshot.paramMap.get('id');
    console.log(idSelected);
    if (idSelected) { // kiểm tra chắc chắn nó không null để khỏi lỗi
      this.stockSelect = this.stockServices.getStock(idSelected);
    }
    
  }
  closeDialog()
  {
    this.router.navigate(["stocklist"]);
  }
}
