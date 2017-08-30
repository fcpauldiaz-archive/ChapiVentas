import { Carrera } from '../domain/carrera.model';
import _db  from './persistence/db.repository';
import { CarreraService } from './services/carrera.service';

/**
 * Get all entities
 * @return Carrera[]
 */
const getAll = async (req, res ) => {
  try {

    const c_service = new CarreraService(_db);
    const carreras = await  c_service.obtenerCarreras();

    return res.json(carreras);
  } catch (err) {
    return res.json(err);
  }
};

/**
 * Create new entity
 * @param {string}  req.body.nombre  [Name of career]
 * @param {string}  req.body.description [Description of career]
 * @param {integer} req.body.estudiantes [quantity of students]
 * @return {string[]} List of entities
 */
const createNewCarrera = async (req, res) => {
  try {

    const c_service = new CarreraService(_db);
    const carrera = new Carrera(req.body.nombre, req.body.descripcion, req.body.estudiantes);
    const saved_carrera = c_service.save(carrera);

    return res.json(saved_carrera);
  } catch (e){
    console.log(e);
    return res.json(e);
  }
}

export default { getAll, createNewCarrera };
