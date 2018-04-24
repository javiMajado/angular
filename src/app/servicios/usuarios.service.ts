import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsuariosService {

  private url;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/usuario'
   }

   getUsuarios(){
    return this.http.get(this.url).map((res:any)=>{
      return res;
    });
  }

  postUsuario(usuario, token){
    //LAS CONSULTAS EN LAS URL SE CONSTRUYEN CON EL SIMBOLO ?
    var consulta = '?token='+ token;
    return this.http.post(this.url + consulta, usuario).map((res:any)=>{
      return res;
    });
  }

  putUsuario(id, usuario){
    return this.http.put(this.url + '/' + id , usuario).map((res:any)=>{
      return res;
    });
  }

  deleteUsuario(id){
    return this.http.delete(this.url+"/"+id).map((res:any)=>{
      return res;
    })
  }

}
