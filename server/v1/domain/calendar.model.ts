import { CalendarDate } from './calendar_date.model';

export class Calendar {

  calendar: CalendarDate[];

  constructor() {
    this.calendar = [];
  }

  agregarPromocionAlMejorDia(promocion: Promocion) {
    let bestDate = 0;
    let cantEstudiantesActual = -1;
    for (let i = 0; i < this.calendar.length; i++) {
      CalendarDate fecha = this.calendar[i];
      if (fecha.cantidadEstudiantes > cantEstudiantesActual) {
        cantEstudiantesActual = fecha.cantidadEstudiantes;
        bestDate = i;
      }
    }
    const calendarDate = this.calendar[bestDate];
    return calendarDate.agregarPromocion(promocion);

  }

}

