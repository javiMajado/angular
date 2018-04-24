import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ProveedoresService } from '../../servicios/proveedores.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import swal from 'sweetalert2';


@Component({
  selector: 'app-crear-prov',
  templateUrl: './crear-prov.component.html',
  styleUrls: ['./crear-prov.component.css'],
  animations: [
    trigger('alerta', [
      state('show', style({opacity:1})),
      state('hide', style({opacity: 0})),
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-in'))
    ])
  ]
})
export class CrearProvComponent implements OnInit {

  @ViewChild('cif') cifRef: ElementRef;

  formProveedor: FormGroup;
  proveedor:any;
  
  provincias:string[] = ['Alava','Albacete','Alicante','Almería','Asturias','Avila','Badajoz','Barcelona','Burgos','Cáceres',
  'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara',
  'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra',
  'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
  'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'];

  mostrarAlerta: boolean = false;
  mensaje: string;
  enviando: boolean = false;

  constructor(private pf: FormBuilder,
              private proveedoresService: ProveedoresService,
              private router: Router) { }

  ngOnInit() {
    this.formProveedor = this.pf.group({
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

  crearProveedor(){
    this.mostrarAlerta = false;
    this.enviando = true;
    this.proveedor = this.guardarProveedor();
    this.proveedoresService.postProveedor(this.proveedor).subscribe((res:any)=>{
      swal({
        title: 'Proveedor Creado',
        text: this.proveedor.nombre,
        position: 'top-end',
        type: 'success',
        timer: 1500
      })
      this.router.navigate(['/listado-proveedores']);
    },(error:any)=>{
      // this.mostrarAlerta = true;
      if(error.error.errores.errors.cif.message){
        this.cifRef.nativeElement.focus();
        this.mensaje = error.error.errores.errors.cif.message;
        swal({
          title: 'Error al crear Proveedor',
          text: this.mensaje,
          type: 'error',
          allowOutsideClick: false,
          showConfirmButton: true
        })
        this.enviando = false;
      }else if(error){
        swal({
          title: 'Error al crear Proveedor',
          text: 'Error de conexion',
          type: 'error',
          allowOutsideClick: false,
          showConfirmButton: true
        })
      }
    });
  }

  guardarProveedor(){
    const guardarProveedor = {
      nombre: this.formProveedor.get("nombre").value,
      cif: this.formProveedor.get("cif").value,
      domicilio: this.formProveedor.get("domicilio").value,
      cp: this.formProveedor.get("cp").value,
      localidad: this.formProveedor.get("localidad").value,
      provincia: this.formProveedor.get("provincia").value,
      telefono: this.formProveedor.get("telefono").value,
      email: this.formProveedor.get("email").value,
      contacto: this.formProveedor.get("contacto").value
    }
    return guardarProveedor;
  }

}
