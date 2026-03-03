import { Component, Input, OnInit } from '@angular/core';
import {Stock} from '../../model/stock';
import { NgClass, CommonModule } from "@angular/common";
@Component({
  selector: 'app-stock-item',
  imports: [NgClass, CommonModule],
  standalone: true,
  templateUrl: './stock-item.html',
  styleUrl: './stock-item.css',
})
export class StockItem  {
  @Input() public stock!: Stock;

  addFavourite(): void {
    this.stock.addFavourite();
  }
}
