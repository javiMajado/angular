import { Component, OnInit } from '@angular/core';
import { LoginService } from '../servicios/login.service';

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
    this.loginService.logout();
  }

  cargarUser(){
    this.usuario = this.loginService.cargarNombre();
    console.log(this.usuario.nombre);
  }
  
}
