import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
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
