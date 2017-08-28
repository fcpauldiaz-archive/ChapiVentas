import Carrera from '../models/carrera.model';

const getAll = async (req, res ) => {
  try {
    const carreras = await Carrera.obtenerTodasLasCarreras();
    return res.json(carreras);
  } catch (err) {
    return res.json(err);
  }
};

export default { getAll };
