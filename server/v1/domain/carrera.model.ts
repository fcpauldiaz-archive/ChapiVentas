export class Carrera {

  nombreCarrera: string;
  descripcionCarrera: string;
  cantidadEstudiantes: number;

  constructor(nombre: string, descripcion: string, estudiantes: number) {
    this.nombreCarrera = nombre;
    this.descripcionCarrera = descripcion;
    this.cantidadEstudiantes = estudiantes;
  }

}
