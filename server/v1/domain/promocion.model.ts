import { Producto } from './producto.model';
import { DescripcionPromocion } from './value_objects/descripcion_promocion.model';
import { TipoPromocion } from './value_objects/tipo_promocion.model';

export class Promocion {

  descuento: number;
  color: string;
  tipoPromocion: TipoPromocion;
  descripcionPromocion: DescripcionPromocion;
  fechaInicioPromo: Date;
  fechaFinalPromo: Date;
  productos: Producto[];

  constructor(tipo: TipoPromocion, des: number, desc: DescripcionPromocion, inicio: Date, final: Date, color: string) {

    this.descuento = des;
    this.tipoPromocion = tipo;
    this.descripcionPromocion = desc;
    this.fechaInicioPromo = new Date(inicio);
    this.fechaFinalPromo = new Date(final);
    this.color = color;
  }

}
