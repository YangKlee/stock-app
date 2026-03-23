import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockList } from '../stock-list/stock-list';
import { Stock } from '../../model/stock';
@Component({
  selector: 'app-create-stock',
  imports: [CommonModule, FormsModule, StockList ],
  standalone: true,
  templateUrl: './create-stock.html',
  styleUrls: ["create-stock.css"],
})
export class CreateStock implements OnInit {
  newStock: Stock = new Stock("", "", 0, 0, "");
  isConfim: boolean = false;
  isFormOpen: boolean = false;
  constructor() {
    
  }
  ngOnInit(): void {

  }

}
