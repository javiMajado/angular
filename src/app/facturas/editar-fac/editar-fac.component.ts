import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FacturasService } from '../../servicios/facturas.service';
import { ProveedoresService } from '../../servicios/proveedores.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Proveedor } from '../../models/proveedor';
import swal from 'sweetalert2';

@Component({
  selector: 'app-editar-fac',
  templateUrl: './editar-fac.component.html',
  styleUrls: ['./editar-fac.component.css']
})
export class EditarFacComponent implements OnInit {

  @ViewChild('proveedor') public proveedorRef: ElementRef;
  public formFra:FormGroup;
  public factura:any = null;
  public proveedores:any;
  public proveedor: Proveedor;
  public base:number;
  public tipo:number;
  public importe:number;
  public total:number;
  public retencion:number;
  public irpf:any = 'no';
  public hoy:string = new Date().toISOString().split('T')[0];

  id:string;

  constructor(private ff: FormBuilder,
              private facturasService: FacturasService,
              private proveedoresService: ProveedoresService,
              private router: Router,
              private route: ActivatedRoute) {
                if(!this.factura){
                  this.factura = {};
                }
               }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getFacturaId(this.id);
    this.cargarProveedores();
    this.recargarForm();
    this.formFra.value.cif = this.factura.cif;
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

      if(this.formFra.get('proveedor').value){
        this.proveedor = new Proveedor(
          this.formFra.get('proveedor').value.nombre,
          this.formFra.get('proveedor').value.cif,
          this.formFra.get('proveedor').value.domicilio,
          this.formFra.get('proveedor').value.cp,
          this.formFra.get('proveedor').value.localidad,
          this.formFra.get('proveedor').value.provincia,
          this.formFra.get('proveedor').value.telefono,
          this.formFra.get('proveedor').value.email,
          this.formFra.get('proveedor').value.contacto
        );
        this.formFra.value.cif = this.proveedor.getCif();
        console.log("Valor "+this.formFra.get('proveedor').value);
      }

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

  // METODOS SERVICIOS
  getFacturaId(id){
    this.facturasService.getFactura(id).subscribe((res:any)=>{
      this.factura = res.factura;
    })
  }

  editarFactura() {
    this.factura = this.guardarFactura();
    this.recargarForm();
    this.onChange();
    this.proveedorRef.nativeElement.focus();

    this.facturasService.putFactura(this.id, this.factura).subscribe((res:any)=>{
      swal({
        title: 'Factura Actualizada',
        position: 'top-end',
        type: 'success',
        timer: 1500
      })
      this.router.navigate(['/listado-facturas']);
    },(error:any)=>{
      if(error){
        swal({
          title: 'Error al crear Factura',
          text: 'Error de conexion',
          type: 'error',
          allowOutsideClick: false,
          showConfirmButton: true
        })
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

    return guardarFactura;
  }

  getCif(){
    return this.formFra.get('cif').value;
  }


  cargarProveedores(){
    this.proveedoresService.getProveedores(100).subscribe((res:any)=>{
      this.proveedores = res.proveedores;
    });
  }
}
