import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registroForm: FormGroup;
  usuario: any;

  mensaje: String;

  constructor(private rf: FormBuilder,
              private usuariosService: UsuariosService,
              private router: Router) { }

  ngOnInit() {
    this.cargarForm();
  }

  crearUsuario(){
    this.usuario = this.guardarUsuario();
    this.usuariosService.postUsuario(this.usuario,"").subscribe((res)=>{
      this.alerta('Usuario creado', this.usuario.email, 'success');
      this.router.navigate(['/']);
    }, (error)=>{
         this.mensaje = 'El usuario ya esta registrado';
         this.alerta('Error', this.mensaje , 'error');
    });
  }

  guardarUsuario(){
    const guardarUsuario = {
      nombre: this.registroForm.get('nombre').value,
      email: this.registroForm.get('email').value.toLowerCase(),
      password: this.registroForm.get('password').value
    }
    return guardarUsuario;
  }

  cargarForm(){
    this.registroForm = this.rf.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required,
                   Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')] ],
      password: ['', [Validators.required,
                     Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')]],
      repassword: ['', Validators.required]
    });
  }

  // resetForm(){
  //   this.registroForm.reset();
  //   this.active=false;
  //   setTimeout(() => this.active = true, 0);    
  // }

  alerta(titulo, texto, tipo){
    swal({
      title: titulo,
      text: texto,
      position: 'top-end',
      type: tipo,
      timer: 1500
    })
  }
}
