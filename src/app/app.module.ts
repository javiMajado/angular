import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatSelectModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';

import { AppComponent } from './app.component';

import { InicioComponent } from './inicio/inicio.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { ListadoUsuariosComponent } from './autenticacion/listado-usuarios/listado-usuarios.component';
import { ComprasComponent } from './compras/compras.component';
import { VentasComponent } from './ventas/ventas.component';

import { ListadoProvComponent } from './proveedores/listado-prov/listado-prov.component';
import { CrearProvComponent } from './proveedores/crear-prov/crear-prov.component';
import { EditarProvComponent } from './proveedores/editar-prov/editar-prov.component';

import { ListadoCliComponent } from './clientes/listado-cli/listado-cli.component';
import { CrearCliComponent } from './clientes/crear-cli/crear-cli.component';
import { EditarCliComponent } from './clientes/editar-cli/editar-cli.component';

import { ListadoFacComponent } from './facturas/listado-fac/listado-fac.component';
import { CrearFacComponent } from './facturas/crear-fac/crear-fac.component';
import { EditarFacComponent } from './facturas/editar-fac/editar-fac.component';

import { ListadoPreComponent } from './presupuestos/listado-pre/listado-pre.component';
import { CrearPreComponent } from './presupuestos/crear-pre/crear-pre.component';
import { EditarPreComponent } from './presupuestos/editar-pre/editar-pre.component';

import { ListadoSesionesComponent } from './sesiones/listado-sesiones/listado-sesiones.component';

import { ProveedoresService } from './servicios/proveedores.service';
import { FacturasService } from './servicios/facturas.service';
import { UsuariosService } from './servicios/usuarios.service';
import { LoginService } from './servicios/login.service';
import { ClientesService } from './servicios/clientes.service';
import { PresupuestosService } from './servicios/presupuestos.service';
import { SesionesService } from './servicios/sesiones.service';

import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { DataTablesModule } from 'angular-datatables';
import { RegistroComponent } from './autenticacion/registro/registro.component';
import { LoginComponent } from './autenticacion/login/login.component';
import { RutasGuard } from './rutas.guard';


const routes:Routes = [
  {path: '', component: InicioComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'inicio-sesion', component: LoginComponent},
  {path: 'listado-usuarios', component: ListadoUsuariosComponent, canActivate: [RutasGuard]},
  {path: 'compras', component: ComprasComponent, canActivate: [RutasGuard]},
  {path: 'ventas', component: VentasComponent, canActivate: [RutasGuard]},
  {path: 'listado-sesiones', component: ListadoSesionesComponent},
  {path: 'listado-proveedores', component: ListadoProvComponent},
  {path: 'crear-proveedor', component: CrearProvComponent},
  {path: 'editar-proveedor/:id', component: EditarProvComponent},
  {path: 'listado-facturas', component: ListadoFacComponent, canActivate: [RutasGuard]},
  {path: 'crear-factura', component: CrearFacComponent, canActivate: [RutasGuard]},
  {path: 'editar-factura/:id', component: EditarFacComponent, canActivate: [RutasGuard]},
  {path: 'listado-clientes', component: ListadoCliComponent, canActivate: [RutasGuard]},
  {path: 'crear-cliente', component: CrearCliComponent, canActivate: [RutasGuard]},
  {path: 'editar-cliente/:id', component: EditarCliComponent, canActivate: [RutasGuard]},
  {path: 'listado-presupuestos', component: ListadoPreComponent, canActivate: [RutasGuard]},
  {path: 'crear-presupuesto', component: CrearPreComponent, canActivate: [RutasGuard]},
  {path: 'editar-presupuesto/:id', component: EditarPreComponent, canActivate: [RutasGuard]},
  {path: '**', component: InicioComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    CabeceraComponent,
    ComprasComponent,
    VentasComponent,
    ListadoProvComponent,
    CrearProvComponent,
    EditarProvComponent,
    ListadoFacComponent,
    CrearFacComponent,
    EditarFacComponent,
    RegistroComponent,
    LoginComponent,
    ListadoCliComponent,
    CrearCliComponent,
    EditarCliComponent,
    ListadoPreComponent,
    CrearPreComponent,
    EditarPreComponent,
    ListadoUsuariosComponent,
    ListadoSesionesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatIconModule,
    DataTablesModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
  })
  ],
  providers: [
    ProveedoresService,
    FacturasService,
    UsuariosService,
    LoginService,
    ClientesService,
    PresupuestosService,
    SesionesService,
    RutasGuard,
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
