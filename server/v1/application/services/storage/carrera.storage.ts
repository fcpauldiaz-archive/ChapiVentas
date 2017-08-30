export class CarreraStorageService {

  _db: any;

  constructor(dbService: any) {
    this._db = dbService;
  }

  save(carrera) {
    return this._db.insertOne('carreras', (carrera));
  }
}
