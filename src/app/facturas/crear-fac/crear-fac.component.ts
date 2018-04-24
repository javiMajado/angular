import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FacturasService } from '../../servicios/facturas.service';
import { ProveedoresService } from '../../servicios/proveedores.service';
import { Router } from '@angular/router';

import swal from 'sweetalert2';

@Component({
  selector: 'app-crear-fac',
  templateUrl: './crear-fac.component.html',
  styleUrls: ['./crear-fac.component.css']
})
export class CrearFacComponent implements OnInit {

  // @ViewChild('proveedor') public proveedorRef: ElementRef;
  public formFra:FormGroup;
  public factura:any = null;
  public proveedores:any;
  public cif: string;
  public base:number;
  public tipo:number;
  public importe:number;
  public total:number;
  public retencion:number;
  public irpf:any = 'no';
  public hoy:string = new Date().toISOString().split('T')[0];

  constructor(private ff:FormBuilder,
              private facturasService: FacturasService,
              private proveedoresService: ProveedoresService,
              private router: Router) {
                if(!this.factura){
                  this.factura = {};
                }
               }

  ngOnInit() {
    this.cargarProveedores();
    this.recargarForm();
    this.onChange();
  }

  recargarForm() {
    this.formFra = this.ff.group({
      proveedor: [null, Validators.required],
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
    this.formFra.valueChanges.subscribe(valores=>{
      // this.formFra.value.cif = this.formFra.get('proveedor').value.cif;
     
      if(this.formFra.get('proveedor').value){
        this.formFra.value.cif = this.formFra.get('proveedor').value.cif;
      }
      
      console.log(this.formFra.value.cif);
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
      this.formFra.value.retencion = this.formatMoneda(this.retencion);
      this.formFra.value.importe = this.formatMoneda(this.importe);
      this.formFra.value.total = this.formatMoneda(this.total);
    });
  }

  crearFactura() {
    this.factura = this.guardarFactura();
    this.recargarForm();
    this.onChange();

    this.facturasService.postFactura(this.factura).subscribe((res:any)=>{
      this.alerta2('Factura Creada','top-end','success',1500);
      this.router.navigate(['/listado-facturas']);
    },(error:any)=>{
      if(error){
        this.alerta('Error al crear Factura','Error de conexion','error');
      }
    })
  }

  guardarFactura(){
    const guardarFactura = {
      proveedor: this.formFra.get('proveedor').value.nombre,
      cif: this.formFra.get('proveedor').value.cif,
      fecha: this.formFra.get('fecha').value,
      concepto: this.formFra.get('concepto').value,
      irpf: this.formFra.get('irpf').value,
      base: this.formFra.get('base').value,
      tipo: this.formFra.get('tipo').value,
      retencion: this.formFra.get('retencion').value,
      importe: this.formFra.get('importe').value,
      total: this.formFra.get('total').value,
      fecEntrega: new Date()
    }

    console.log(guardarFactura);
    return guardarFactura;
  }

  getCif(){
    return this.formFra.get('cif').value;
  }

  cargarProveedores(){
    this.proveedoresService.getProveedores().subscribe((res:any)=>{
      this.proveedores = res.proveedores;
    });
  }
  
  alerta(title, text, type){
    swal({
      title: title,
      text: text,
      type: type,
      allowOutsideClick: false,
      showConfirmButton: true
    })
  }

  alerta2(title, position, type, timer){
    swal({
      title: title,
      position: position,
      type: type,
      timer: timer
    })
  }
}
