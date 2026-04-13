import { CanActivateFn } from '@angular/router';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { map } from 'rxjs';
export const authGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(Auth);
  const router = inject(Router);

  return authService.isLogin().pipe(map(e=>{
    if(e)
      return true;
    else
    {
      router.navigate(['/login']);
      return false;
      
    }
  }))

};
