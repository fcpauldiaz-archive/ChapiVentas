export class DescripcionCarrera {

  descripcion: string;

  constructor(descripcion: string) {
  	this.descripcion = descripcion;
  }

  validateDescripcionCarrera(): boolean {
    return this.descripcion.length > 0
  }

}
