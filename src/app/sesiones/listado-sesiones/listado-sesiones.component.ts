import { Component, OnInit } from '@angular/core';
import { SesionesService } from '../../servicios/sesiones.service';
import { LoginService } from '../../servicios/login.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import swal from 'sweetalert2';



@Component({
  selector: 'app-listado-sesiones',
  templateUrl: './listado-sesiones.component.html',
  styleUrls: ['./listado-sesiones.component.css']
})
export class ListadoSesionesComponent implements OnInit {
  
  sesiones: any;
  sesion: any;
  usuario: any;
  email: any;

  constructor(private sesionesService: SesionesService,
              private loginService: LoginService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.cargarSesiones();
  }

  cargarSesiones(){
    this.email = this.route.snapshot.params['email'];
    this.sesionesService.getSesiones(this.email).subscribe((res:any)=>{
      this.sesiones = res.sesiones;
    });
  }

  diferenciaSesiones(fLogin, fLogout){
    var diferencia;

    var fechaMoment = moment(fLogout);
    console.log("fechaMoment: "+ fechaMoment);
    if(fLogout){
      diferencia = fechaMoment.diff(fLogout, 'seconds');
    }

    console.log("DIF: "+ diferencia);

    return diferencia;
  }

  
}
