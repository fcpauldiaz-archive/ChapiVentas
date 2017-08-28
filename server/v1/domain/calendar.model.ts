import { Carrera } from './carrera.model';

class Calendar {

  fechaEvento: Date;
  cantidadEstudiantes: number;
  carreraEstudiantes: Carrera;

  constructor(fecha: Date, cant: number, carrera: Carrera) {
    this.fechaEvento = fecha;
    this.cantidadEstudiantes = cant;
    this.carreraEstudiantes = carrera;
  }




}
