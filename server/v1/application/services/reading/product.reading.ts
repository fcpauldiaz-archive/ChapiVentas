export class ProductReadingService {

  _db: any;

  constructor(dbService: any) {
    this._db = dbService;
  }

  async getAllProducts() {
    return await this._db.dbList('products');
  }
}
