export class PromocionService {

  _db: any;

  constructor(dbService: any) {
    this._db = dbService;
  }

  save(promocion) {
    return this._db.insertOne('promociones', (promocion));
  }

  async obtenerPromociones() {
    return await this._db.dbList('promociones');
  }

  async obtenerPromocionesPorFecha(fechaInicio, fechaFinal) {
    const promociones = await this._db.dbList('promociones');
    const filtro = [];
    for (let i = 0; i < promociones.length; i++) {
      if (fechaInicio - promociones[i].fechaInicioPromo >= 0 && 0 >= fechaFinal - promociones[i].fechaFinalPromo) {
        filtro.push(promociones[i]);
      }
    }
    return filtro;
  }


}
