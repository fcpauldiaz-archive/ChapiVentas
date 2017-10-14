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
  let startingDate = new Date();
  try {
    const c_service = new CarreraReadingService(_db);
    const carreras = await  c_service.obtenerCarreras();

    client.increment('careers_get_success');
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('careers_get_response_time', timeDiff);

    return res.json(carreras);
  } catch (err) {

    client.increment('careers_get_error');
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('careers_get_response_time', timeDiff);
    
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
  let startingDate = new Date();
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
    client.increment('careers_create_invalid_params');
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('careers_create_response_time', timeDiff);
    return res.json({"mensaje": "Parámetros inválidos", "parametros_invalidos": invalidParams})
  }

  try {
    const c_service = new CarreraStorageService(_db);
    const carrera = new Carrera(carreraNombre, descripcionCarrera, req.body.estudiantes);
    const saved_carrera = c_service.save(carrera);
    res.status(200);

    client.increment('careers_create_success');
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('careers_create_response_time', timeDiff);

    return res.json(saved_carrera);
  } catch (e){
    res.status(500);

    client.increment('careers_create_error');
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('careers_create_response_time', timeDiff);

    return res.json(e);
  }
}

export default { getAll, createNewCarrera };
