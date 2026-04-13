import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';
import { CommonModule } from "@angular/common";
import {MatInputModule} from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, MatButtonModule, MatFormFieldModule,MatInputModule, RouterModule, MatIconModule],
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login implements OnInit {
  loginFrm!: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private authServices: Auth){};
  ngOnInit(): void {
    this.loginFrm = this.fb.group({
      txtUsername: ['', Validators.required],
      txtPassword: ['', Validators.required]
    });
  }
  doLogin(){
    if(this.loginFrm.valid)
    {
      const username = this.loginFrm.get('txtUsername')?.value;
      const password = this.loginFrm.get('txtPassword')?.value;
      this.authServices.login(username, password).subscribe(succ=>{
        alert(succ);
        this.router.navigate(["/stocklist"]);
      }, err=>{
        alert(err);
      })
    }
    else
    {
      alert("Vui lòng điền đầy đủ các trường thông tin");
    }
  }
}
