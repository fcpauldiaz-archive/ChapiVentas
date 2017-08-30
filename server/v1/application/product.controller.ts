import { Producto } from '../domain/producto.model';
import _db from './persistence/db.repository';
import { ProductService } from './services/product.service';
import { ValorMonetario } from '../domain/valor_monetario.model';

const createProduct = async (req, res) => {
  try {
    const p_service = new ProductService(_db);
    const
    const producto = new Producto(req.body.nombre, req.body.precio, req.body.moneda);
    const product = await p_service.save(producto);
    return res.json(product);
  } catch (e) {
    return res.json(e);
  }
}
