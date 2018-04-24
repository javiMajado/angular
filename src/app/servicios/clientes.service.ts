import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ClientesService {

  private url;
  
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/cliente';
   }

   getClientes(){
    return this.http.get(this.url).map((res:any)=>{
      return res;
    });
  }

  getCliente(id){
    return this.http.get(this.url+"/"+id).map((res:any)=>{
      return res;
    })
  }

  postCliente(cliente){
    return this.http.post(this.url, cliente).map((res:any)=>{
      return res;
    });
  }

  putCliente(id, cliente){
    return this.http.put(this.url+"/"+id, cliente).map((res:any)=>{
      return res;
    })
  }

  deleteCliente(id){
    return this.http.delete(this.url+"/"+id).map((res:any)=>{
      return res;
    })
  }

}
