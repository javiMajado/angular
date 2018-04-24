import { Component, OnInit } from '@angular/core';
import { FacturasService } from '../../servicios/facturas.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-listado-fac',
  templateUrl: './listado-fac.component.html',
  styleUrls: ['./listado-fac.component.css']
})
export class ListadoFacComponent implements OnInit {

  facturas: any;

  constructor(private facturasService: FacturasService) { }

  ngOnInit() {
    this.cargarFacturas();
  }

  cargarFacturas(){
    this.facturasService.getFacturas().subscribe((res:any)=>{
      this.facturas = res.facturas;
    });
  }

  borrarFactura(id){
    swal({
      title: '¿Desea eliminar la Factura?',
      text: "No hay marcha atras",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.value) {
        this.facturasService.deleteFactura(id).subscribe(()=>{
          this.cargarFacturas(); //Volver a cargar el component (?)
          swal(
            'Factura Eliminada',
            'La factura ha sido eliminada',
            'success'
          )
        },(error:any)=>{
          swal(
            'Error de conexion',
            'No se ha podido eliminar la factura',
            'error'
          )
        });
      }
    })
  }

}
