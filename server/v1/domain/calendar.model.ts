import { CalendarDate } from './calendar_date.model';
import { Promocion } from './promocion.model';

export class Calendar {

  calendar: CalendarDate[];

  constructor() {
    this.calendar = [];
  }

  agregarPromocionAlMejorDia(promocion: Promocion) {
    let bestDate = 0;
    let cantEstudiantesActual = -1;
    for (let i = 0; i < this.calendar.length; i++) {
      const fecha = this.calendar[i];
      if (fecha.cantidadEstudiantes > cantEstudiantesActual) {
        cantEstudiantesActual = fecha.cantidadEstudiantes;
        bestDate = i;
      }
    }
    const calendarDate = this.calendar[bestDate];
    return calendarDate.agregarPromocion(promocion);

  }

}

