import { CanActivateFn } from '@angular/router';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; 
export const authGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(Auth);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) {
        // Nếu đang chạy trên Server (F5 lần đầu), ta trả về 'true' 
        // để Guard không đá user ra login quá sớm.
        // Hoặc nếu bạn đã có thông tin user trong loginedUser thì dùng nó.
        return true;
  }
  else
  {
  return authService.isLogin().pipe(map(e=>{
    if(e)
      return true;
    else
    {
      router.navigate(['auth/login'])
      return false;
      
    }
  }))
  }


};
