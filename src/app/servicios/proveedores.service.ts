import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import 'rxjs/add/operator/map';

@Injectable()
export class ProveedoresService {
  private url;
  private token;
  private consultaToken;

  constructor(private http: HttpClient,
              private loginService: LoginService) { 
    this.url = 'http://localhost:3000/proveedor';
    this.token = localStorage.getItem('token');;
  }

  getProveedores(pageSize){
    var ruta = this.url+ '?token=' + this.token;
    var tramo = '?tramo=' + pageSize;
    return this.http.get(this.url+tramo).map((res:any)=>{
      return res;
    });
  }

  getProveedor(id){
    var ruta = this.url+"/"+id+ '?token=' + this.token;
    return this.http.get(ruta).map((res:any)=>{
      return res;
    })
  }

  postProveedor(proveedor){
    var ruta = this.url+ '?token=' + this.token;
    return this.http.post(ruta, proveedor).map((res:any)=>{
      return res;
    });
  }

  putProveedor(id, proveedor){
    var ruta = this.url+"/"+id+ '?token=' + this.token;
    return this.http.put(ruta, proveedor).map((res:any)=>{
      return res;
    })
  }

  deleteProveedor(id){
    console.log("Token " +this.token);
    var ruta  = this.url+"/"+ id + '?token=' + this.token;
    return this.http.delete(ruta).map((res:any)=>{
      return res;
    })
  }
}
