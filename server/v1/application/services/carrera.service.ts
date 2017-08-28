export class CarreraService {

  _db: any;

  constructor(dbService: any) {
    this._db = dbService;
  }

  save(carrera) {
    return this._db.insertOne('carreras', (carrera));
  }

  async obtenerCarreras() {
    return await this._db.dbList('carreras');
  }


}
