import { CarreraFecha } from '../domain/carrera_fecha.model';
import _db from './persistence/db.repository';
import { DateCareerStorageService } from './services/storage/carrera_fecha.storage';
import { DateCareerReadingService } from './services/reading/carrera_fecha.reading';

import { StatsD } from 'node-statsd/lib/statsd';

var client = new StatsD({
  host: 'ec2-52-90-161-71.compute-1.amazonaws.com'
})

const createCarreraFecha = async (req, res) => {
  let startingDate = new Date();
  try {
    const cf_service = new DateCareerStorageService(_db);

    const carrera_fecha_model = new CarreraFecha(req.body.fecha, req.body.descripcion, req.body.titulo);
    const carrera_fecha = await cf_service.save(carrera_fecha_model);

    client.increment('careers_date_create_success');
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('careers_date_create_response_time', timeDiff);

    return res.json(carrera_fecha_model);
  } catch (e) {
    client.increment('careers_date_create_error');
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('careers_date_create_response_time', timeDiff);
    return res.json(e);
  }
}

const getCarreraFecha = async (req, res) => {
  let startingDate = new Date();
  try {
    const cf_service = new DateCareerReadingService(_db);
    const date_careers =  await cf_service.getAllDateCareers();

    client.increment('careers_date_get_success');
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('careers_date_get_response_time', timeDiff);

    return res.json(date_careers);
  } catch (e) {
    client.increment('careers_date_get_error');
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('careers_date_get_response_time', timeDiff);
    return res.json(e);
  }
}

const getCarreraFechaMes = async (req, res) => {
  let startingDate = new Date();
  try {
    const cf_service = new DateCareerReadingService(_db);
    const date_careers =  await cf_service.getAllDateCareers();
    const month = req.body.month - 1;
    const filteredCareers = date_careers.filter((date_career) => ((new Date(date_career.fecha)).getMonth() == month))

    client.increment('careers_date_get_by_month_success');
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('careers_date_get_by_month_response_time', timeDiff);

    return res.json(filteredCareers);
  } catch (e) {
    client.increment('careers_date_get_by_month_error'); 
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('careers_date_get_by_month_response_time', timeDiff);
    return res.json(e);
  }
}


export default { createCarreraFecha, getCarreraFecha, getCarreraFechaMes };
