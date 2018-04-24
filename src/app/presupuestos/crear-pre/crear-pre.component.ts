import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PresupuestosService } from '../../servicios/presupuestos.service';
import { ClientesService } from '../../servicios/clientes.service';
import { Router } from '@angular/router';

import swal from 'sweetalert2';

@Component({
  selector: 'app-crear-pre',
  templateUrl: './crear-pre.component.html',
  styleUrls: ['./crear-pre.component.css']
})
export class CrearPreComponent implements OnInit {
  public formPre:FormGroup;
  public presupuesto:any = null;
  public clientes:any;
  public cif: string;
  public base:number;
  public tipo:number;
  public importe:number;
  public total:number;
  public retencion:number;
  public irpf:any = 'no';
  public hoy:string = new Date().toISOString().split('T')[0];

  constructor(private ff:FormBuilder,
              private presupuestosService: PresupuestosService,
              private clientesService: ClientesService,
              private router: Router) {
                if(!this.presupuesto){
                  this.presupuesto = {};
                }
               }

  ngOnInit() {
    this.cargarClientes();
    this.recargarForm();
    this.onChange();
  }

  recargarForm() {
    this.formPre = this.ff.group({
      cliente: [null, Validators.required],
      cif: [null, [Validators.minLength(9),Validators.maxLength(9),Validators.required]],
      fecha: this.hoy,
      irpf: 'no',
      concepto: null,
      base: null,
      tipo: 0.21,
      retencion: this.formatMoneda(0),
      importe: this.formatMoneda(0),
      total: this.formatMoneda(0)
    });
    this.irpf = 'no';
  }

  redondear(valor){
    var resultado;
    if(valor < 0 ){
      resultado = (Math.round(-valor*100)/100) *-1;
    }else{
      resultado = Math.round(valor*100)/100;
    }
    return resultado;
  }

  formatMoneda(valor){
    return new Intl.NumberFormat("es-Es", {style:"currency", currency:"EUR"}).format(valor);   
  }

  onChange(){
    this.formPre.valueChanges.subscribe(valores=>{
      // this.formPre.value.cif = this.formPre.get('cliente').value.cif;
     
      if(this.formPre.get('cliente').value){
        this.formPre.value.cif = this.formPre.get('cliente').value.cif;
      }
      
      console.log(this.formPre.value.cif);
      this.base = this.redondear(valores.base);
      this.tipo = valores.tipo;
      this.irpf = valores.irpf;

      if (this.irpf == 'si') {
        this.retencion = this.redondear(this.base * -0.15);
      }else {
        this.retencion = 0;
      }

      this.importe = this.redondear(this.base * this.tipo);
      this.total = this.redondear(this.base + this.retencion + this.importe);
      this.formPre.value.retencion = this.formatMoneda(this.retencion);
      this.formPre.value.importe = this.formatMoneda(this.importe);
      this.formPre.value.total = this.formatMoneda(this.total);
    });
  }

  crearPresupuesto() {
    this.presupuesto = this.guardarPresupuesto();
    // this.recargarForm();
    this.onChange();
    // this.clienteRef.nativeElement.focus();

    this.presupuestosService.postPresupuesto(this.presupuesto).subscribe((res:any)=>{
      this.alerta('Presupuesto creado', 'top-end', 'success', 'timer');
      this.router.navigate(['/listado-presupuestos']);
    },(error:any)=>{
      if(error){
        swal({
          title: 'Error al crear Presupuesto',
          text: 'Error de conexion',
          type: 'error',
          allowOutsideClick: false,
          showConfirmButton: true
        })
      }
    })
  }

  guardarPresupuesto(){
    const guardarPresupuesto = {
      cliente: this.formPre.get('cliente').value.nombre,
      cif: this.formPre.get('cliente').value.cif,
      fecha: this.formPre.get('fecha').value,
      concepto: this.formPre.get('concepto').value,
      irpf: this.formPre.get('irpf').value,
      base: this.formPre.get('base').value,
      tipo: this.formPre.get('tipo').value,
      retencion: this.formPre.get('retencion').value,
      importe: this.formPre.get('importe').value,
      total: this.formPre.get('total').value,
      fecEntrega: new Date()
    }

    console.log(guardarPresupuesto);
    return guardarPresupuesto;
  }

  getCif(){
    return this.formPre.get('cif').value;
  }

  cargarClientes(){
    this.clientesService.getClientes().subscribe((res:any)=>{
      this.clientes = res.clientes;
    });
  }

  alerta(title, position, type, timer) {
    swal({
      title: title,
      position: position,
      type: type,
      timer: timer
    })
  }
}
