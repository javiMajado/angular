import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PresupuestosService {

  private url;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/presupuesto'
   }

   getPresupuestos(){
     return this.http.get(this.url).map((res:any)=>{
      return res;
     });
   }

   getPresupuesto(id){
     return this.http.get(this.url+"/"+id).map((res:any)=>{
      return res;
     });
   }

   postPresupuesto(presupuesto){
     return this.http.post(this.url, presupuesto).map((res:any)=>{
      return res;
     });
   }

   putPresupuesto(id, presupuesto){
     return this.http.put(this.url+"/"+id, presupuesto).map((res:any)=>{
      return res;
     });
   }

   deletePresupuesto(id){
     return this.http.delete(this.url+"/"+id).map((res:any)=>{
      return res;
     });
   }

}
