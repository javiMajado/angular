import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from '../../servicios/usuarios.service';
import { LoginService } from '../../servicios/login.service';
import { Router } from '@angular/router';
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
    this.loginService.login(this.usuario).subscribe((res)=>{
      this.router.navigate(['/']);
    },(error)=>{     
      if(error.error.mensaje){
        this.alerta('Error', error.error.mensaje, 'error', 4000);
      }    
    });

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
