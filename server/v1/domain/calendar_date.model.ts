import { Carrera } from './carrera.model';
import { Promocion } from './promocion.model';

class CalendarDate {

  fechaEvento: Date;
  cantidadEstudiantes: number;
  carreraEstudiantes: Carrera;
  promociones: Promocion[];

  constructor(fecha: Date, cant: number, carrera: Carrera) {
    this.fechaEvento = fecha;
    this.cantidadEstudiantes = cant;
    this.carreraEstudiantes = carrera;
  }

  agregarPromocion(promocion: Promocion) {
    if (this.promociones.length < 10) {
      this.promociones.push(promocion);
      return true;
    }
    return false;
  }


}
