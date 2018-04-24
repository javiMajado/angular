import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ProveedoresService } from '../../servicios/proveedores.service';
import { LoginService } from '../../servicios/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-editar-prov',
  templateUrl: './editar-prov.component.html',
  styleUrls: ['./editar-prov.component.css']
})
export class EditarProvComponent implements OnInit {
  formProveedor: FormGroup;
  proveedor:any;
  
  provincias:string[] = ['Alava','Albacete','Alicante','Almería','Asturias','Avila','Badajoz','Barcelona','Burgos','Cáceres',
  'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara',
  'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra',
  'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
  'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'];

  id:string;

 constructor(private pf: FormBuilder,
             private proveedoresService: ProveedoresService,
             private loginService: LoginService,
             private router: Router,
             private route: ActivatedRoute) {
               if(!this.proveedor){
                 this.proveedor = {};
               }
              }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getProveedorId(this.id);
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

  getProveedorId(id){
    this.proveedoresService.getProveedor(id).subscribe((res:any)=>{
      this.proveedor = res.proveedor;
    })
  }

  editarProveedor() {
    this.proveedor = this.guardarProveedor();
    this.proveedoresService.putProveedor(this.id, this.proveedor).subscribe((res:any)=>{
      swal({
        title: 'Proveedor Actualizado',
        text: this.proveedor.nombre,
        position: 'top-end',
        type: 'success',
        timer: 1500
      })
      this.router.navigate(['/listado-proveedores']);
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
