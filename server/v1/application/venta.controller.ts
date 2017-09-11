import { ReporteVenta } from '../domain/venta.model';
import { Producto } from '../domain/producto.model';
import _db from './persistence/db.repository';
import { VentaStorageService } from './services/storage/venta.storage';
import { VentaReadingService } from './services/reading/venta.reading';


const addSale = async (req, res) => {
  try {
    const p_service = new VentaStorageService(_db);
    const reporte = new ReporteVenta(
      req.body.date,
      new Producto(req.body.product.product_name, req.body.product.product_price, 'GTQ'),
      req.body.invoice.amount,
      req.body.quantity
    );
    const saved_reporte = await p_service.save(reporte);
    return res.json(saved_reporte);
  } catch (e) {
    return res.json(e);
  }
}

const getSales = async (req, res) => {
  try {
    const p_service = new VentaReadingService(_db);
    const reportes =  await p_service.getAll();
    return res.json(reportes);
  } catch (e) {
    return res.json(e);
  }
}

export default { addSale, getSales };
