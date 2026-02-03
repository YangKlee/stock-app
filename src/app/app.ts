import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { Login } from './auth/login/login';
import { StockItem } from './stock/stock-item/stock-item';
import { StockList } from "./stock/stock-list/stock-list";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, StockList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('stock-app');
}
