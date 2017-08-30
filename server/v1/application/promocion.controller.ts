import { Promocion } from '../domain/promocion.model';
import _db  from './persistence/db.repository';
import { PromocionService } from './services/promocion.service';

const getMesPromociones = async (req, res) => {
  try {
    const p_service = new PromocionService(_db);
    const promociones = await p_service.obtenerPromociones();
    return res.json(promociones);
  } catch(err) {
    return res.json(err);
  }
}

const createNewPromocion = async (req, res) => {
  try {
    const p_service = new PromocionService(_db);
    const promocion = new Promocion(req.body.tipo, req.body.descuento, req.body.descripcion,
      req.body.fechaInicioPromo, req.body.fechaFinalPromo);
    const saved_promocion = p_service.save(promocion);
    return res.json(saved_promocion);

  }catch (e) {
    console.log(e);
    return res.json(e);
  }
}

export default { getMesPromociones, createNewPromocion };
