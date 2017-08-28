export class ProductService {

  _db: any;

  constructor(dbService: any) {
    console.log(dbService);
    this._db = dbService;
  }

  saveProducts(products: string[]) {
    console.log(this._db)
    return this._db.insertMany('products', products);
  }




}
