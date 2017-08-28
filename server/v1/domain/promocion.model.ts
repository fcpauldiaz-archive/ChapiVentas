export class Promocion {

  descuento: number;
  tipoPromocion: string;
  descripcionPromocion: string;
  fechaInicioPromo: Date;
  fechaFinalPromo: Date;

  constructor(tipo: string, des: number, desc: string, inicio: Date, final: Date) {
    this.descuento = des;
    this.tipoPromocion = tipo;
    this.descripcionPromocion = desc;
    this.fechaInicioPromo = inicio;
    this.fechaFinalPromo = final;
  }

}
