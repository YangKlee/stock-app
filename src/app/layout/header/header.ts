import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';
import { audit } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIcon } from "@angular/material/icon";
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule, MatIcon, MatButtonModule,MatDividerModule],
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(private authServices: Auth, private router: Router){};
  isLogin(): boolean
  {
    if(this.authServices.loginedUser == null)
      return false;
    return true;
  }
  getUsername(): String| undefined
  {
    return this.authServices.loginedUser?.username;
  }
  logout()
  {
    this.authServices.logout().subscribe(succ=>{
      this.router.navigate(['/auth/login']);
    })
  }
}
