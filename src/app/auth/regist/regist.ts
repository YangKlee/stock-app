import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';
import { User } from '../../model/user';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-regist',
  imports: [ReactiveFormsModule, CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule, RouterLink],
  templateUrl: './regist.html',
  styleUrl: './regist.css',
})
export class Regist implements OnInit {
  registFrm!:FormGroup;
  constructor(private fb:FormBuilder, private authServices:Auth, private router: Router){};
  ngOnInit(): void {
    this.registFrm = this.fb.group({
      txtUsername: ['', Validators.required],
      txtPassword: ['', Validators.required],
      txtRepassword: ['', Validators.required]
    })
  }
  doRegist()
  {
    if(this.registFrm.valid)
    {
      const username = this.registFrm.get('txtUsername')?.value;
      const password = this.registFrm.get('txtPassword')?.value;
      const repassword = this.registFrm.get('txtRepassword')?.value;

      if(password != repassword)
      {
        alert("Mật khẩu không giống nhau");
        return;
      }
      this.authServices.addUser(new User("0",username, password)).subscribe(succ=>{
        alert("Đăng ký thành công");
      },
    err=>{
      alert("Đăng ký thất bại")
    })

    }
  }
}
