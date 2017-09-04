export class TipoPromocion {

  tipo: string;

  constructor(tipo: string) {
  	this.tipo = tipo;
  }

  validateNombreCarrera(): boolean {
    return this.tipo.length > 0
  }

}
