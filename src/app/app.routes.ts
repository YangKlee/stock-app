import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { StockList } from './stock/stock-list/stock-list';
import { CreateStockReactform } from './stock/create-stock-reactform/create-stock-reactform';
import { MainLayout } from './layout/main-layout/main-layout';
import { AuthLayout } from './layout/auth-layout/auth-layout';
export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: 'stocklist', component: StockList, children:[
              { path: 'createstock', component: CreateStockReactform }
      ]},

    ]
  },
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: 'login', component: Login }
    ]
  }
];