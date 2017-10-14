import { Producto } from '../domain/producto.model';
import _db from './persistence/db.repository';
import { ProductStorageService } from './services/storage/product.storage';
import { ProductReadingService } from './services/reading/product.reading';

import { StatsD } from 'node-statsd/lib/statsd';

var client = new StatsD({
  host: 'ec2-52-90-161-71.compute-1.amazonaws.com'
})

const createProduct = async (req, res) => {
  let startingDate = new Date();
  try {
    const p_service = new ProductStorageService(_db);

    const producto = new Producto(req.body.nombre, req.body.precio, req.body.moneda);
    const product = await p_service.save(producto);

    client.increment('products_create_success');
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('products_create_response_time', timeDiff);
    
    return res.json(product);
  } catch (e) {
    client.increment('products_create_error');
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('products_create_response_time', timeDiff);
    return res.json(e);
  }
}

const getProducts = async (req, res) => {
  let startingDate = new Date();
  try {
    const p_service = new ProductReadingService(_db);
    const products =  await p_service.getAllProducts();

    client.increment('products_get_success');
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('products_get_response_time', timeDiff);

    return res.json(products);
  } catch (e) {
    client.increment('products_get_error');
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('products_get_response_time', timeDiff);
    return res.json(e);
  }
}

export default { createProduct, getProducts };
