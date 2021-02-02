import { Subject } from 'rxjs';
import { Usuario } from './usuario';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authenticatedUser$ = new Subject<boolean>()
  
  private showMenuEmitter$  = new Subject<boolean>()


  constructor(private router:Router) {}

  public authenticateUser(usuario: Usuario) {
    if (usuario.nome === 'admin' && usuario.password === '123') {
      this.authenticatedUser$.next(true) ;
      this.showMenuEmitter$.next(true)
      this.router.navigate(['/'])
    }else{
      this.authenticatedUser$.next(false)
      this.showMenuEmitter$.next(false)
      console.log('erro no login'); 
      
    }

    
    
  }
  public getEmitterMenu(){
    return this.showMenuEmitter$
  }
  public authenticated(){
    return this.authenticatedUser$
  }
}
