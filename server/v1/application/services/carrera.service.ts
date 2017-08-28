export class CarreraService {

  _db: any;

  constructor(dbService: any) {
    this._db = dbService;
  }

  save(carrera) {
    return this._db.dbInsert('carreras', JSON.stringify(carrera));
  }

  obtenerCarreras() {
    return this._db.dbList('carreras');
  }


}
