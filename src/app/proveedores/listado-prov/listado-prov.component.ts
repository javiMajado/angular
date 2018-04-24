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

  proveedores:any;
  mensaje: string;

  currentPage: 0;
  pageSize: 5;

  
  constructor(private proveedoresService: ProveedoresService,
              private loginService: LoginService) { }

  ngOnInit() {
    this.cargarProveedores();
  }

  cargarProveedores(){
    this.proveedoresService.getProveedores().subscribe((res:any)=>{
      this.proveedores = res.proveedores;
    });
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
