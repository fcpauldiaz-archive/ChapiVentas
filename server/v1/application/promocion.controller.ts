import { Promocion } from '../domain/promocion.model';
import { TipoPromocion } from '../domain/value_objects/tipo_promocion.model';
import { DescripcionPromocion } from '../domain/value_objects/descripcion_promocion.model';
import _db  from './persistence/db.repository';
import { PromocionService } from './services/promocion.service';
const amqp = require('amqplib');

const getMesPromociones = async (req, res) => {
  try {
    const p_service = new PromocionService(_db);
    const promociones = await p_service.obtenerPromociones();
    return res.json(promociones);
  } catch(err) {
    return res.json(err);
  }
}

const sendEvent = async(topic, data) => {
 try {
    const conn = await amqp.connect('amqp://localhost');
    const ch = await conn.createChannel();
    ch.assertQueue(topic, { durable: true });
    ch.sendToQueue(topic, new Buffer.from(JSON.stringify(data)));
    console.log('promotion sent');
 } catch (e) {
   console.log(e);
 }

}

const createNewPromocion = async (req, res) => {
  try {
    const p_service = new PromocionService(_db);
    const tipoPromocion = new TipoPromocion(req.body.tipo);
    const descripcionPromocion = new DescripcionPromocion(req.body.descripcion);
    const promocion = new Promocion(tipoPromocion, req.body.descuento, descripcionPromocion,
      req.body.fechaInicioPromo, req.body.fechaFinalPromo);
    const saved_promocion = await p_service.save(promocion);
    sendEvent('new_promotion', promocion);
    return res.json(promocion);

  } catch (e) {
    console.log(e);
    return res.json(e);
  }
}

const getPromocionFecha = async (req, res) => {
  try {
    const p_service = new PromocionService(_db);
    const fechaInicio = new Date(req.query.fechaInicio);
    const fechaFinal = new Date(req.query.fechaFinal);
    const query = await p_service.obtenerPromocionesPorFecha(fechaInicio, fechaFinal);
    return res.json(query);
  } catch (e) {
    console.log(e)
    return res.json(e);
  }
}

export default { getMesPromociones, createNewPromocion, getPromocionFecha };
