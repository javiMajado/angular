import { Component, OnInit } from '@angular/core';
import { SesionesService } from '../../servicios/sesiones.service';
import { LoginService } from '../../servicios/login.service';

import swal from 'sweetalert2';



@Component({
  selector: 'app-listado-sesiones',
  templateUrl: './listado-sesiones.component.html',
  styleUrls: ['./listado-sesiones.component.css']
})
export class ListadoSesionesComponent implements OnInit {
  
  sesiones: any;
  sesion: any;

  constructor(private sesionesService: SesionesService,
              private loginService: LoginService) { }

  ngOnInit() {
    this.cargarSesiones();
  }

  cargarSesiones(){
    this.sesionesService.getSesiones().subscribe((res:any)=>{
      this.sesiones = res.sesiones;
    });
  }

  
}
