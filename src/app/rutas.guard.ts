import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuariosService } from './servicios/usuarios.service';
import { LoginService } from './servicios/login.service';

@Injectable()
export class RutasGuard implements CanActivate {

  constructor(private usuariosService: UsuariosService,
              private loginService: LoginService){}

  canActivate(){
    if(this.loginService.isConnected()){
      return true;
    } else {
      return false;
    }
  }
    
}
