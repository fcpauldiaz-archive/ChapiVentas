export class NombreProducto {

  nombre: string;

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  validateNombreProducto(): boolean {
    return this.nombre.length > 0;
  }

}
