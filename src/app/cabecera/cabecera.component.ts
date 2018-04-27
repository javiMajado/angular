import { Component, OnInit } from '@angular/core';
import { LoginService } from '../servicios/login.service';
import * as moment from 'moment';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  private usuario: any;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.cargarUser();
  }

  getLogin(){
    return this.loginService.isConnected();
  }

  desconectar(){
    moment.locale('es');
    let now = moment().format('L') + "/" + moment().format('LTS');
    console.log('Moment '+ now);
    var fechaActual = new Date();
    var fechaParse = fechaActual.getDate() + "/" + (fechaActual.getMonth() +1) + "/" + fechaActual.getFullYear() +"/"+ fechaActual.getHours() + ":" + fechaActual.getMinutes() + ":" + fechaActual.getSeconds();
    this.loginService.logoutSesion(now);
    this.loginService.logout();
  }

  cargarUser(){
    this.usuario = this.loginService.cargarNombre();
    console.log(this.usuario.nombre);
  }
  
}
