export class NombreCarrera {

  nombre: string;

  constructor(nombre: string) {
  	this.nombre = nombre;
  }

  validateNombreCarrera(): boolean {
    return this.nombre.length > 0
  }

}
