import { Carrera } from './carrera.model';
import { Promocion } from './promocion.model';

export class CalendarDate {

  fechaEvento: Date;
  carreras: Carrera[];
  promociones: Promocion[];

  constructor(fecha: Date) {
    this.fechaEvento = fecha;
  }

  agregarPromocion(promocion: Promocion): boolean {
    //max promotions per day
    if (this.promociones.length < 10) {
      this.promociones.push(promocion);
      return true;
    }
    return false;
  }

  calcularCantidadEstudiantes(): number {
    let cant = 0;
    for (let i = 0; i < this.carreras.length; i++) {
      cant += this.carreras[i].cantidadEstudiantes;
    }
    return cant;
  }


}
