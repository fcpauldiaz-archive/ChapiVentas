import { Carrera } from './carrera.model';
import { Promocion } from './promocion.model';

class CalendarDate {

  fechaEvento: Date;
  cantidadEstudiantes: number;
  carreraEstudiantes: Carrera;
  promocion: Promocion;

  constructor(fecha: Date, cant: number, carrera: Carrera) {
    this.fechaEvento = fecha;
    this.cantidadEstudiantes = cant;
    this.carreraEstudiantes = carrera;
  }




}
