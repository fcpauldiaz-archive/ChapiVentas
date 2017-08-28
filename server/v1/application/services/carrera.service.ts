export class CarreraService {

  _db: any;

  constructor(dbService: any) {
    this._db = dbService;
  }

  save(carrera) {
    return this._db.insertOne('carreras', (carrera));
  }

  obtenerCarreras() {
    return this._db.dbList('carreras');
  }


}
