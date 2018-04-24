import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from '../../servicios/usuarios.service';
import { LoginService } from '../../servicios/login.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import swal from 'sweetalert2';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css'],
  animations: [
    trigger('formulario', [
      state('show', style({opacity:1, height:50})),
      state('hide', style({opacity:0, height:0})),
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-in'))
    ]),
    trigger('alerta', [
      state('show', style({opacity:1})),
      state('hide', style({opacity:0})),
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-in'))
    ])
  ]
})

export class ListadoUsuariosComponent implements OnInit {

  formUsuario: FormGroup;
  formEditarUsuario: FormGroup;
  usuarios:any;
  usuarioNuevo:Usuario;
  usuarioEdit:any;
  mostrarFormulario: boolean = false;
  mostrarAlerta: boolean = false;
  enviando: boolean = false;
  filaEditada: string;
  mensaje:string = 'Error de conexion con la base de datos';


  constructor(private usuariosService: UsuariosService,
              private loginService: LoginService,
              private fu: FormBuilder,
              private feu: FormBuilder) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.formUsuario = this.fu.group({
      nombre: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      rol: [null, Validators.required]
    });

    this.formEditarUsuario = this.feu.group({
      nombre: [null, Validators.required],
      email: [null, Validators.required],
      rol: [null, Validators.required]
    });
  }

  get MostrarFormulario(){
    return this.mostrarFormulario ? 'show' : 'hide';
  }

  get estadoAlerta(){
    return this.estadoAlerta ? 'show' : 'hide';
  }

  verFormulario(){
    this.mostrarFormulario = !this.mostrarFormulario;
    this.formUsuario.reset();
  }


  crearUsuario(){
    this.enviando = true;
    this.usuarioNuevo = this.guardarUsuario();
    this.usuariosService.postUsuario(this.usuarioNuevo, this.loginService.getToken()).subscribe((res:any)=>{
      this.mensaje = 'Usuario creado correctamente';
      this.alerta(this.mensaje, this.usuarioNuevo.email, 'success');
      this.enviando = false;
      this.mostrarAlerta = true;
      this.cargarUsuarios();
      this.formUsuario.reset();
      setTimeout(()=>{
        this.mostrarAlerta = false;
      },2000);
    }, (error)=>{
      if(error.error.mensaje === 'Token invalido'){
        this.mensaje = 'Sesion caducada, reinicie sesión';
        this.alerta('Error', this.mensaje, 'error');
      }
      this.enviando = false;
      this.mostrarAlerta = true;
      setTimeout(()=>{
        this.mostrarAlerta = false;
      },2000);
    });
    setTimeout(()=>{
      this.mensaje = '';
    },2500);
  }

  editarUsuario(id){
    this.enviando = true;
    this.usuarioEdit = this.guardarUsuarioEdit();
    this.usuariosService.putUsuario(id, this.usuarioEdit).subscribe((res:any)=>{
      this.mensaje = 'Usuario actualizado correctamente';
      this.alerta(this.mensaje, this.usuarioEdit.email, 'success');
      this.enviando = false;
      this.filaEditada = '';
    }, (error)=>{
      if(error.error.errores.errores.email.message){
        this.mensaje = error.error.errores.errores.email.message;
      }else{
        this.mensaje = "Error de conexion con la BD";
      }
      this.alerta(this.mensaje, this.usuarioEdit.email, 'error');
      this.enviando = false;
    });
  }

  eliminarUsuario(id){
    this.usuariosService.deleteUsuario(id).subscribe((res:any)=>{
      this.mensaje = 'Usuario eliminado correctamente';
      this.alerta(this.mensaje, '', 'success');
      this.cargarUsuarios();
    });
  }


  cancelarEdicion(){
    this.filaEditada = '';
    this.cargarUsuarios();
  }

  guardarUsuarioEdit(){
    const guardarUsuarioEdit = {
      nombre: this.formEditarUsuario.get('nombre').value,
      email: this.formEditarUsuario.get('email').value.toLowerCase(),
      rol: this.formEditarUsuario.get('rol').value,
    }

    return guardarUsuarioEdit;
  }

  guardarUsuario(){
    const guardarUsuario = {
      nombre: this.formUsuario.get('nombre').value,
      email: this.formUsuario.get('email').value.toLowerCase(),
      password: this.formUsuario.get('password').value,
      rol: this.formUsuario.get('rol').value,
    }

    return guardarUsuario;
  }

  cargarUsuarios(){
    this.usuariosService.getUsuarios().subscribe((res:any)=>{
      this.usuarios = res.usuarios;
    },(error)=>{
      if(error){
        console.log(error);
      }
      
    });
  }

  editarFila(id){
    this.filaEditada = id;
  }

  alerta(titulo, texto, tipo){
    swal({
      title: titulo,
      text: texto,
      position: 'top-end',
      type: tipo,
      timer: 1500
    })
  }

  borrarUsuario(id){
    swal({
      title: '¿Desea eliminar el usuario?',
      text: "No hay marcha atras",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.value) {
        this.usuariosService.deleteUsuario(id).subscribe((res:any)=>{
          this.usuarioEdit = res.usuario;
          console.log(res);
          this.cargarUsuarios(); 
          swal(
             this.usuarioEdit.nombre + ' eliminado',
            'El Usuario  ha sido eliminado',
            'success'
          )
        },(error:any)=>{
          swal(
            'Error de conexion',
            'No se ha podido eliminar el Usuario',
            'error'
          )
        });
      }
    })

  }
}

export interface Usuario{
  nombre:String,
  email:String,
  password:String,
  rol:String
}
