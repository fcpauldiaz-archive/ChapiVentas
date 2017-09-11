import { Carrera } from './carrera.model';
import { Promocion } from './promocion.model';

export class CarreraFecha {

  fechaEvento: Date;
  titulo: string;
  descripcion: string;
  carreras: Carrera[];
  promociones: Promocion[];

 constructor(fecha: string, descripcion: string, titulo: string) {
    this.fechaEvento = new Date(fecha);
    this.descripcion = descripcion;
    this.titulo = titulo;
  }

}
