export class Cliente {
    nombre: String;
    cif: String;
    domicilio: String;
    cp: Number;
    localidad: String;
    provincia: String;
    telefono: String;
    email: String;
    contacto: String;

    constructor(
        nombre: String,
        cif: String,
        domicilio: String,
        cp: Number,
        localidad: String,
        provincia: String,
        telefono: String,
        email: String,
        contacto: String,){

        this.nombre = nombre;
        this.cif = cif;
        this.domicilio = domicilio;
        this.cp = cp;
        this.localidad = localidad;
        this.provincia = provincia;
        this.telefono = telefono;
        this.email = email;
        this.contacto = contacto;
          }

    getCif(){
        return this.cif;
    }
  }