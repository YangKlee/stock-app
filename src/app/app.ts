import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { StockList } from "./stock/stock-list/stock-list";
import { CreateStock } from './stock/create-stock/create-stock';
import {CreateStockReactform} from "./stock/create-stock-reactform/create-stock-reactform"
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ Header, Footer, StockList,  CreateStockReactform],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('stock-app');
}
