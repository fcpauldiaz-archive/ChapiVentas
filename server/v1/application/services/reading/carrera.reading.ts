export class CarreraReadingService {

  _db: any;

  constructor(dbService: any) {
    this._db = dbService;
  }

  async obtenerCarreras() {
    return await this._db.dbList('carreras');
  }


}
