export class VentaReadingService {

  _db: any;

  constructor(dbService: any) {
    this._db = dbService;
  }

  async getAll() {
    return await this._db.dbList('ventas');
  }
}
