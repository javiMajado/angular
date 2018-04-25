import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../servicios/proveedores.service';
import { LoginService } from '../../servicios/login.service';

import swal from 'sweetalert2';


@Component({
  selector: 'app-listado-prov',
  templateUrl: './listado-prov.component.html',
  styleUrls: ['./listado-prov.component.css']
})
export class ListadoProvComponent implements OnInit {

  proveedores:any[];
  mensaje: string;

  totales: number;
  currentPage: number = 0;
  pageSize: number = 0;

  botones: any[] = [];
  tramoBotones: any = 0;
  
  constructor(private proveedoresService: ProveedoresService,
              private loginService: LoginService) { }

  ngOnInit() {
    this.cargarProveedores();
  }

  cargarProveedores(){
    this.proveedoresService.getProveedores(this.pageSize).subscribe((res:any)=>{
      this.proveedores = res.proveedores;
      this.totales = res.totales;
      this.botones = [];
      this.generarBotones();
    });
  }

  setTramo(valor){
    if(this.pageSize == (this.tramoBotones+5)*5){
      this.tramoBotones +=5;
      this.generarBotones();
    }
  }

  setPageSize(valor){
      this.pageSize += valor;
      this.cargarProveedores();
  }

  setPagina(valor){
    this.pageSize = valor;
    this.cargarProveedores();
    this.generarBotones();
  }

  setTramoBotones(tramoBotones){
    this.tramoBotones = tramoBotones;
    this.generarBotones();
  }

  generarBotones(){
    this.botones = [];
    var i;
    for(i=this.tramoBotones; i<this.tramoBotones+5; i++){
      this.botones.push(i+1);
    }
    console.log(this.botones);
  }

  borrarProveedor(id){
    swal({
      title: '¿Desea eliminar el proveedor?',
      text: "No hay marcha atras",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.value) {
        this.proveedoresService.deleteProveedor(id).subscribe(()=>{
          this.cargarProveedores(); //Volver a cargar el component (?)
          swal(
            'Proveedor Eliminado',
            'El proveedor ha sido eliminado',
            'success'
          )
        },(error:any)=>{
          if(error.error.mensaje === 'Token invalido'){
            this.mensaje = 'Sesión caducada, reinicie sesión';
          }else {
            this.mensaje = 'Error de conexion';
          }
          swal(
            this.mensaje,
            'No se ha podido eliminar el proveedor',
            'error'
          )
        });
      }
    })
    
  }
}
