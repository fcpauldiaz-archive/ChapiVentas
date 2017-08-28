export class ProductService {

  _db: any;

  constructor(dbService: any) {
    this._db = dbService;
  }

  saveProducts(products: string[]) {
    return this._db.insertMany('products', products);
  }




}
