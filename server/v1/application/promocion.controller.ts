import { Promocion } from '../domain/promocion.model';
import { TipoPromocion } from '../domain/value_objects/tipo_promocion.model';
import { DescripcionPromocion } from '../domain/value_objects/descripcion_promocion.model';
import _db  from './persistence/db.repository';
import { PromocionService } from './services/promocion.service';
const amqp = require('amqplib');

import { StatsD } from 'node-statsd/lib/statsd';

var client = new StatsD({
  host: 'ec2-52-90-161-71.compute-1.amazonaws.com'
})

const getMesPromociones = async (req, res) => {
  let startingDate = new Date();
  try {
    const p_service = new PromocionService(_db);
    const promociones = await p_service.obtenerPromociones();

    client.increment('promotions_get_by_month_success');
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('promotions_get_by_month_response_time', timeDiff);

    return res.json(promociones);
  } catch(err) {

    client.increment('promotions_get_by_month_error');
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('promotions_get_by_month_response_time', timeDiff);

    return res.json(err);
  }
}

const sendEvent = async(topic, data) => {
  let startingDate = new Date();
  try {
    const conn = await amqp.connect('amqp://13.58.81.154');
    const ch = await conn.createChannel();
    ch.assertQueue(topic, { durable: true });
    ch.sendToQueue(topic, new Buffer.from(JSON.stringify(data)));

    client.increment('promotions_send_event_success');
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('promotions_send_event_response_time', timeDiff);

    console.log('promotion sent');
  } catch (e) {
    console.log(e);
    client.increment('promotions_send_event_error');
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('promotions_send_event_response_time', timeDiff);
  }

}

const createNewPromocion = async (req, res) => {
  let startingDate = new Date();
  try {
    const p_service = new PromocionService(_db);
    const tipoPromocion = new TipoPromocion(req.body.tipo);
    const descripcionPromocion = new DescripcionPromocion(req.body.descripcion);
    const promocion = new Promocion(tipoPromocion, req.body.descuento, descripcionPromocion,
      req.body.fechaInicioPromo, req.body.fechaFinalPromo, req.body.color);
    const saved_promocion = await p_service.save(promocion);
    sendEvent('new_promotion', promocion);

    client.increment('promotions_create_success');
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('promotions_create_response_time', timeDiff);

    return res.json(promocion);
  } catch (e) {
    client.increment('promotions_create_error');
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('promotions_create_response_time', timeDiff);
    return res.json(e);
  }
}

const getPromocionFecha = async (req, res) => {
  let startingDate = new Date();
  try {
    const p_service = new PromocionService(_db);
    const fechaInicio = new Date(req.query.fechaInicio);
    const fechaFinal = new Date(req.query.fechaFinal);
    const query = await p_service.obtenerPromocionesPorFecha(fechaInicio, fechaFinal);

    client.increment('promotions_get_by_date_success');
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('promotions_get_by_date_response_time', timeDiff);

    return res.json(query);
  } catch (e) {
    client.increment('promotions_get_by_date_error');
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('promotions_get_by_date_response_time', timeDiff);
    return res.json(e);
  }
}

const deletePromocion = async (req, res) => {
  let startingDate = new Date();
  try {
    const p_service = new PromocionService(_db);
    const response = await p_service.eliminarPromocion(req.body.id);

    client.increment('promotions_delete_success');
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('promotions_delete_response_time', timeDiff);

    return res.json(response);
  } catch (e) {
    client.increment('promotions_delete_error');
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('promotions_delete_response_time', timeDiff);
    return res.json(e);
  }

}

export default { getMesPromociones, createNewPromocion, getPromocionFecha, deletePromocion };
