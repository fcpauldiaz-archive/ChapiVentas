import { Producto } from '../domain/producto.model';
import _db from './persistence/db.repository';
import { ProductStorageService } from './services/storage/product.storage';
import { ProductReadingService } from './services/reading/product.reading';


const createProduct = async (req, res) => {
  try {
    const p_service = new ProductStorageService(_db);

    const producto = new Producto(req.body.nombre, req.body.precio, req.body.moneda);
    const product = await p_service.save(producto);
    return res.json(product);
  } catch (e) {
    return res.json(e);
  }
}

const getProducts = async (req, res) => {
  try {
    const p_service = new ProductReadingService(_db);
    const products =  await p_service.getAllProducts();
    return res.json(products);
  } catch (e) {
    return res.json(e);
  }
}

export default { createProduct, getProducts };
