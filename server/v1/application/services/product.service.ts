export class ProductService {

  _db: any;

  constructor(dbService: any) {
    this._db = dbService;
  }

  saveProducts(products: string[]) {
    return this._db.insertMany('products', products);
  }

  async save(product) {
    return await this._db.insertOne('products', product);
  }

  async getAllProducts() {
    return await this._db.dbList('products');
  }




}
