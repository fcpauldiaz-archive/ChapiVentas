import { CarreraFecha } from '../domain/carrera_fecha.model';
import _db from './persistence/db.repository';
import { DateCareerStorageService } from './services/storage/carrera_fecha.storage';
import { DateCareerReadingService } from './services/reading/carrera_fecha.reading';


const createCarreraFecha = async (req, res) => {
  try {
    const cf_service = new DateCareerStorageService(_db);

    const carrera_fecha_model = new CarreraFecha(req.body.fecha, req.body.descripcion, req.body.titulo);
    const carrera_fecha = await cf_service.save(carrera_fecha_model);
    return res.json(carrera_fecha_model);
  } catch (e) {
    console.log(e);
    return res.json(e);
  }
}

const getCarreraFecha = async (req, res) => {
  try {
    const cf_service = new DateCareerReadingService(_db);
    const date_careers =  await cf_service.getAllDateCareers();
    return res.json(date_careers);
  } catch (e) {
    return res.json(e);
  }
}

const getCarreraFechaMes = async (req, res) => {
  try {
    const cf_service = new DateCareerReadingService(_db);
    const date_careers =  await cf_service.getAllDateCareers();
    const month = req.body.month - 1;
    const filteredCareers = date_careers.filter((date_career) => ((new Date(date_career.fecha)).getMonth() == month))
    return res.json(filteredCareers);
  } catch (e) {
    return res.json(e);
  }
}


export default { createCarreraFecha, getCarreraFecha, getCarreraFechaMes };
