import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class SesionesService {
  private url;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/sesion';
   }

   getSesiones(email){
     return this.http.get(this.url+ '?email=' + email).map((res:any)=>{
      return res;
     });
   }

   getAllSesiones(){
    return this.http.get(this.url).map((res:any)=>{
      return res;
     });
   }

   postSesion(sesion){
     return this.http.post(this.url, sesion).map((res:any)=>{
      return res;
     });
   }

  putSesion(id, logout){
    var sesion = {
      logout: logout
    }
    return this.http.put(this.url + '/' + id , sesion).map((res:any)=>{
      console.log(res);
      return res;
    },(error)=>{
      console.log(error);
    })
  }

}
