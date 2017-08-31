import { NombreCarrera } from './value_objects/nombre_carrera.model';
import { DescripcionCarrera } from './value_objects/descripcion_carrera.model';



export class Carrera {

  nombreCarrera: NombreCarrera;
  descripcionCarrera: DescripcionCarrera;
  cantidadEstudiantes: number;

  constructor(nombre: NombreCarrera, descripcion: DescripcionCarrera, estudiantes: number) {
    this.nombreCarrera = nombre;
    this.descripcionCarrera = descripcion;
    this.cantidadEstudiantes = estudiantes;
  }

}
