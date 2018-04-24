import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ClientesService } from '../../servicios/clientes.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import swal from 'sweetalert2';

@Component({
  selector: 'app-crear-cli',
  templateUrl: './crear-cli.component.html',
  styleUrls: ['./crear-cli.component.css']
})
export class CrearCliComponent implements OnInit {

  @ViewChild('cif') cifRef: ElementRef;

  formCliente: FormGroup;
  cliente:any;
  
  provincias:string[] = ['Alava','Albacete','Alicante','Almería','Asturias','Avila','Badajoz','Barcelona','Burgos','Cáceres',
  'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara',
  'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra',
  'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
  'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'];

  mostrarAlerta: boolean = false;
  mensaje: string;
  enviando: boolean = false;

  constructor(private pf: FormBuilder,
              private clientesService: ClientesService,
              private router: Router) { }

  ngOnInit() {
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

  get estadoAlerta(){
    return this.mostrarAlerta ? 'show' : 'hide';
  }

  crearCliente(){
    this.mostrarAlerta = false;
    this.enviando = true;
    this.cliente = this.guardarCliente();
    this.clientesService.postCliente(this.cliente).subscribe((res:any)=>{
      swal({
        title: 'Cliente Creado',
        text: this.cliente.nombre,
        position: 'top-end',
        type: 'success',
        timer: 1500
      })
      this.router.navigate(['/listado-clientes']);
    },(error:any)=>{
      // this.mostrarAlerta = true;
      if(error.error.errores.errors.cif.message){
        this.cifRef.nativeElement.focus();
        this.mensaje = error.error.errores.errors.cif.message;
        swal({
          title: 'Error al crear Cliente',
          text: this.mensaje,
          type: 'error',
          allowOutsideClick: false,
          showConfirmButton: true
        })
        this.enviando = false;
      }else if(error){
        swal({
          title: 'Error al crear Cliente',
          text: 'Error de conexion',
          type: 'error',
          allowOutsideClick: false,
          showConfirmButton: true
        })
      }
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
