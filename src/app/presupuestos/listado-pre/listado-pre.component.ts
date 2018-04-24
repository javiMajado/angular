import { Component, OnInit } from '@angular/core';
import { PresupuestosService } from '../../servicios/presupuestos.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-listado-pre',
  templateUrl: './listado-pre.component.html',
  styleUrls: ['./listado-pre.component.css']
})
export class ListadoPreComponent implements OnInit {

  presupuestos: any;

  constructor(private presupuestosService: PresupuestosService) { }

  ngOnInit() {
    this.cargarPresupuestos();
  }

  cargarPresupuestos(){
    this.presupuestosService.getPresupuestos().subscribe((res:any)=>{
      this.presupuestos = res.presupuestos;
    });
  }

  borrarPresupuesto(id){
    swal({
      title: '¿Desea eliminar el Presupuesto?',
      text: "No hay marcha atras",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.value) {
        this.presupuestosService.deletePresupuesto(id).subscribe(()=>{
          this.cargarPresupuestos(); //Volver a cargar el component (?)
          swal(
            'Presupuesto Eliminado',
            'El presupuesto ha sido eliminado',
            'success'
          )
        },(error:any)=>{
          swal(
            'Error de conexion',
            'No se ha podido eliminar el presupuesto',
            'error'
          )
        });
      }
    })
  }
}
