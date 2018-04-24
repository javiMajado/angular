import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ClientesService } from '../../servicios/clientes.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-editar-cli',
  templateUrl: './editar-cli.component.html',
  styleUrls: ['./editar-cli.component.css']
})
export class EditarCliComponent implements OnInit {

  formCliente: FormGroup;
  cliente:any;
  
  provincias:string[] = ['Alava','Albacete','Alicante','Almería','Asturias','Avila','Badajoz','Barcelona','Burgos','Cáceres',
  'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara',
  'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra',
  'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
  'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'];

  id:string;

 constructor(private pf: FormBuilder,
             private clientesService: ClientesService,
             private router: Router,
             private route: ActivatedRoute) {
               if(!this.cliente){
                 this.cliente = {};
               }
              }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getClienteId(this.id);
    this.formCliente = this.pf.group({
      nombre: null,
      cif: null,
      domicilio: null,
      cp: null,
      localidad: null,
      provincia: null,
      telefono: null,
      email: null,
      contacto: null
    });
  }

  getClienteId(id){
    this.clientesService.getCliente(id).subscribe((res:any)=>{
      this.cliente = res.cliente;
    })
  }

  editarCliente() {
    this.cliente = this.guardarCliente();
    this.clientesService.putCliente(this.id, this.cliente).subscribe((res:any)=>{
      swal({
        title: 'Cliente Actualizado',
        text: this.cliente.nombre,
        position: 'top-end',
        type: 'success',
        timer: 1500
      })
      this.router.navigate(['/listado-clientes']);
    });
  }

  guardarCliente(){
    const guardarCliente = {
      nombre: this.formCliente.get("nombre").value,
      cif: this.formCliente.get("cif").value,
      domicilio: this.formCliente.get("domicilio").value,
      cp: this.formCliente.get("cp").value,
      localidad: this.formCliente.get("localidad").value,
      provincia: this.formCliente.get("provincia").value,
      telefono: this.formCliente.get("telefono").value,
      email: this.formCliente.get("email").value,
      contacto: this.formCliente.get("contacto").value
    }
    return guardarCliente;
  }
}
