import { Promocion } from '../domain/promocion.model';
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
    const conn = await amqp.connect('amqp://localhost')
    const ch = await conn.createChannel();
    //await ch.assertQueue(topic);
    ch.sendToQueue(topic, new Buffer.from(JSON.stringify(data)););
    console.log('message sent');
 } catch (e) {
   console.log(e);
 }

}

const createNewPromocion = async (req, res) => {
  try {
    const p_service = new PromocionService(_db);
    const promocion = new Promocion(req.body.tipo, req.body.descuento, req.body.descripcion,
      req.body.fechaInicioPromo, req.body.fechaFinalPromo);
    const saved_promocion = p_service.save(promocion);
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
