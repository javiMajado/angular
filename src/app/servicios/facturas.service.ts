import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FacturasService {

  private url;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/factura'
   }

   getFacturas(){
     return this.http.get(this.url).map((res:any)=>{
      return res;
     });
   }

   getFactura(id){
     return this.http.get(this.url+"/"+id).map((res:any)=>{
      return res;
     });
   }

   postFactura(factura){
     return this.http.post(this.url, factura).map((res:any)=>{
      return res;
     });
   }

   putFactura(id, factura){
     return this.http.put(this.url+"/"+id, factura).map((res:any)=>{
      return res;
     });
   }

   deleteFactura(id){
     return this.http.delete(this.url+"/"+id).map((res:any)=>{
      return res;
     });
   }
}
