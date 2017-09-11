export class VentaStorageService {

  _db: any;

  constructor(dbService: any) {
    this._db = dbService;
  }

  saveProducts(ventas: string[]) {
    return this._db.insertMany('ventas', ventas);
  }

  async save(venta) {
    return await this._db.insertOne('ventas', venta);
  }

}
