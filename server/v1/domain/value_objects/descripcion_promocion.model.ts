export class DescripcionPromocion {

  descripcion: string;

  constructor(descripcion: string) {
  	this.descripcion = descripcion;
  }

  validateDescripcionPromocion(): boolean {
    return this.descripcion.length > 0
  }

}
