import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../servicios/clientes.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-listado-cli',
  templateUrl: './listado-cli.component.html',
  styleUrls: ['./listado-cli.component.css']
})
export class ListadoCliComponent implements OnInit {

  clientes:any;

  currentPage: 0;
  pageSize: 5;

  
  constructor(private clientesService: ClientesService) { }

  ngOnInit() {
    this.cargarClientes();
  }

  cargarClientes(){
    this.clientesService.getClientes().subscribe((res:any)=>{
      this.clientes = res.clientes;
    });
  }

  borrarCliente(id){
    swal({
      title: '¿Desea eliminar el cliente?',
      text: "No hay marcha atras",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.value) {
        this.clientesService.deleteCliente(id).subscribe(()=>{
          this.cargarClientes(); //Volver a cargar el component (?)
          swal(
            'Cliente Eliminado',
            'El cliente ha sido eliminado',
            'success'
          )
        },(error:any)=>{
          swal(
            'Error de conexion',
            'No se ha podido eliminar el cliente',
            'error'
          )
        });
      }
    })

    
  }
}
