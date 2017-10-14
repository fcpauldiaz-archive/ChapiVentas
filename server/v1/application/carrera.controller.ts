import { Carrera } from '../domain/carrera.model';
import _db  from './persistence/db.repository';
import { CarreraService } from './services/carrera.service';
import { CarreraReadingService } from './services/reading/carrera.reading';
import { CarreraStorageService } from './services/storage/carrera.storage';

import { NombreCarrera } from '../domain/value_objects/nombre_carrera.model';
import { DescripcionCarrera } from '../domain/value_objects/descripcion_carrera.model';

import { StatsD } from 'node-statsd/lib/statsd';

var client = new StatsD({
  host: 'ec2-52-90-161-71.compute-1.amazonaws.com'
})

/**
 * Get all entities
 * @return Carrera[]
 */
const getAll = async (req, res ) => {
  try {
    const c_service = new CarreraReadingService(_db);
    const carreras = await  c_service.obtenerCarreras();
    client.increment('get_all_careers');
    client.timing('my_response_time', 4200);
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
  let invalidParams = [];
  let carreraNombre: NombreCarrera = new NombreCarrera(req.body.nombre);
  let descripcionCarrera: DescripcionCarrera = new DescripcionCarrera(req.body.descripcion);
  

  if(!carreraNombre.validateNombreCarrera()) {
    invalidParams.push("nombre")
  }

  if(!descripcionCarrera.validateDescripcionCarrera()) {
    invalidParams.push("carrera")
  }

  if(invalidParams.length > 0) {
    res.status(400);
    return res.json({"mensaje": "Parámetros inválidos", "parametros_invalidos": invalidParams})
  }

  try {
    const c_service = new CarreraStorageService(_db);
    const carrera = new Carrera(carreraNombre, descripcionCarrera, req.body.estudiantes);
    const saved_carrera = c_service.save(carrera);
    res.status(200);
    return res.json(saved_carrera);
  } catch (e){
    res.status(500);
    return res.json(e);
  }
}

export default { getAll, createNewCarrera };
