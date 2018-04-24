import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { AnonymousSubject } from 'rxjs/Subject';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

  private url;
  private loged: boolean = false;
  private token: string = '';
  private nombre: string;
  private rol: string;
  private usuario:any; 

  constructor(private http: HttpClient,
              private router: Router) {
    this.url = 'http://localhost:3000/login'
   }


  login(usuario){
    return this.http.post(this.url, usuario).map((res:any)=>{
      this.guardarCredenciales(res.token, res.nombre, res.rol);
      return res
    });
  }

  guardarCredenciales(token, nombre, rol){
    localStorage.setItem('token', token);
    localStorage.setItem('nombre', nombre);
    localStorage.setItem('rol', rol);
    this.token = token;
    this.nombre = nombre;
    this.rol = rol;
  }

  cargarCredenciales(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.nombre = localStorage.getItem('nombre');
      this.rol = localStorage.getItem('rol');
    }else{
      this.token = '';
      this.rol = '';
      this.nombre = '';
    }
  }

  cargarNombre(){
    if(localStorage.getItem('nombre')){
      this.nombre = localStorage.getItem('nombre');
    }else{
      this.nombre = '';
    }

    return this.nombre;
  }

  isConnected(){
    return (this.token.length > 0) ? true : false;
  }

  logout(){
    this.token = '';
    this.nombre = '';
    this.rol = '';
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    localStorage.removeItem('rol');
    this.router.navigate(['/']);
  }

  getToken(){
    return this.token;
  }

  getPerAdmin(){
    if (this.rol === 'Administrador'){
        return true;
    }else {
      return false;
    }
  }

  getPerCompras(){
    if (this.rol === 'Administrador' || this.rol === 'Director de Compras' || this.rol === 'Empleado de compras'){
      return true;
    }else {
      return false;
    }
  }

  getPerVentas(){
    if (this.rol === 'Administrador' || this.rol === 'Director de Ventas' || this.rol === 'Empleado de Ventas'){
      return true;
    }else {
      return false;
    }
  }

  getPerProveedores(){
    if (this.rol === 'Administrador' || this.rol === 'Director de Compras'){
      return true;
    }else {
      return false;
    }
  }
}
