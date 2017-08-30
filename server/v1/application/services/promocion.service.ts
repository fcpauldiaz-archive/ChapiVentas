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


}
