import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from '../../servicios/usuarios.service';
import { LoginService } from '../../servicios/login.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { trigger, state, style, animate, transition } from '@angular/animations';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  usuario: any;
  sesion: any;

  mensaje: String;

  constructor(private fl: FormBuilder,
              private usuariosService: UsuariosService,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
    this.cargarForm();
  }

  inicioSesion(){
    this.usuario = this.guardarUsuario();
    this.sesion = this.guardarSesion();
    this.loginService.login(this.usuario).subscribe((res)=>{
      this.loginService.registroSesion(this.sesion);
      this.router.navigate(['/']);
    },(error)=>{     
      if(error.error.mensaje){
        this.alerta('Error', error.error.mensaje, 'error', 4000);
      }    
    });
    
  }

  guardarSesion(){
    moment.locale('es');
    let now = moment().format('L') + "/" + moment().format('LTS');
    // var fechaActual = new Date();
    // var fechaParse = fechaActual.getDate() + "/" + (fechaActual.getMonth() +1) + "/" + fechaActual.getFullYear() +"/"+ fechaActual.getHours() + ":" + fechaActual.getMinutes() + ":" + fechaActual.getSeconds();
    const sesion = {
      email: this.usuario.email,
      login: now,
      logout: ''
    }

    return sesion;
    
  }

  guardarUsuario(){
    const guardarUsuario = {
      email: this.loginForm.get('email').value.toLowerCase(),
      password: this.loginForm.get('password').value
    }
    return guardarUsuario;
  }

  cargarForm(){
    this.loginForm = this.fl.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // resetForm(){
  //   this.registroForm.reset();
  //   this.active=false;
  //   setTimeout(() => this.active = true, 0);    
  // }

  alerta(titulo, texto, tipo, time){
    swal({
      title: titulo,
      text: texto,
      position: 'top-end',
      type: tipo,
      timer: time
    })
  }

}
