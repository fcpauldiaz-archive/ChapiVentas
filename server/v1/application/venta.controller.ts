import { ReporteVenta } from '../domain/venta.model';
import { Producto } from '../domain/producto.model';
import _db from './persistence/db.repository';
import { VentaStorageService } from './services/storage/venta.storage';
import { VentaReadingService } from './services/reading/venta.reading';

import { StatsD } from 'node-statsd/lib/statsd';

var client = new StatsD({
  host: 'ec2-52-90-161-71.compute-1.amazonaws.com'
})

const addSale = async (req, res) => {
  let startingDate = new Date();
  try {
    const p_service = new VentaStorageService(_db);
    const reporte = new ReporteVenta(
      req.body.date,
      new Producto(req.body.product.product_name, req.body.product.product_price, 'GTQ'),
      req.body.invoice.amount,
      req.body.quantity
    );
    const saved_reporte = await p_service.save(reporte);

    client.increment('sells_create_success');
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('sells_create_response_time', timeDiff);

    return res.json(saved_reporte);
  } catch (e) {
    client.increment('sells_create_error');
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('sells_create_response_time', timeDiff);
    return res.json(e);
  }
}

const getSales = async (req, res) => {
  let startingDate = new Date();
  try {
    const p_service = new VentaReadingService(_db);
    const reportes =  await p_service.getAll();

    client.increment('sells_get_success');
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('sells_get_response_time', timeDiff);
    
    return res.json(reportes);
  } catch (e) {
    client.increment('sells_get_error');
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('sells_get_response_time', timeDiff);
    return res.json(e);
  }
}

export default { addSale, getSales };
