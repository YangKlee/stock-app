import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Observer, of, map } from 'rxjs';
import { HttpServices } from './http-services';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  public loginedUser: User | null = null;
  constructor(private cookieService: CookieService, private httpServices: HttpServices){}
  login(username: String, password: String): Observable<any>
  {
    return this.httpServices.verifyLogin(username, password).pipe(
      map(e=>{
        if(e.length > 0)
        {
          const userLogin = e[0];
          this.loginedUser = e[0];
          // tạo token cho lần login sau
          const token = crypto.randomUUID();
          this.httpServices.pathToken(userLogin.id, token).subscribe(succ=>{
            // set cookies cho token login , sống 1 ngày
            this.cookieService.set("auth", token, 1);
            
            console.log("Path token success!!!");
          }, err=>{
            return new Error("Lỗi thiết lập phiên đăng nhập");
          })
          return "Đăng nhập thành công";
        }
        else
        {
          return new Error("Sai tài khoản hoặc mật khẩu");
        }
      })
    )
  }
  isLogin(): Observable<boolean>{
    if(this.loginedUser == null)
    {
        // xác minh xem user có lưu cokies đăng nhập k, nếu có tự động login
        // xử lý khi ram vô tình xóa services hoặc người dùng thoát khỏi trang
      const token = this.cookieService.get("auth");
      console.log(`get token: ${token}`)
      if(token == "" || token == null)
      {
        console.log("token tempty");
        // đá về login
        return of(false);
      }
      else
      {
        // nếu có, tải lại loginedUser
        return this.httpServices.getUserByToken(token).pipe(map(e=>{
          if(e.length > 0) // tồn tại user link với token đó thì ms tiếp tục
          {
            this.loginedUser = e[0];
            console.log("correct token, continue session");
            return true;
          }
          else
          {
            // đá về login nếu token k hợp lệ
            console.log("invalid token");
            return false;
          }
        }))
      }
    }
    else
    {
      return of(true);
    }
  }
}
