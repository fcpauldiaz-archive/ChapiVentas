export class PromocionService {

  _db: any;

  constructor(dbService: any) {
    this._db = dbService;
  }

  async save(promocion) {
    return await this._db.insertOne('promociones', (promocion));
  }

  async obtenerPromociones() {
    return await this._db.dbList('promociones');
  }

  async obtenerPromocionesPorFecha(fechaInicio, fechaFinal) {
    const promociones = await this._db.dbList('promociones');
    const promocionesFiltradas = promociones.filter((promocion) => (fechaInicio - promocion.fechaInicioPromo >= 0 && 0 >= fechaFinal - promocion.fechaFinalPromo));
    
    return promocionesFiltradas;
  }


}
