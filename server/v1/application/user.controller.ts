import { User } from '../domain/user.model';
import { UserService } from './services/user.service';
import _db  from './persistence/db.repository';


/**
 * Get user
 * @returns {User}
 */
const get = async (req, res) => {
  try {
    const u_service = new UserService(_db);
    const user = await u_service.buscarUsuario(req.params.username);
    return res.json(user);
  } catch (e) {
    return res.json(e);
  }
};

/**
 * Get user
 * @returns {User}
 */
const list = async (req, res) => {
  try {
    const u_service = new UserService(_db);
    const user = await u_service.obtenerUsuarios();
    return res.json(user);
  } catch (e) {
    return res.json(e);
  }
};

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.email - The email of user.
 * @property {string} req.body.password - The passwrod of user.
 * @returns {User}
 */
const create = async (req, res) => {
  try {
    const user = new User(req.body.username, req.body.password);
    const u_service = new UserService(_db);
    const usr = await u_service.save(user);
    return res.json(usr);
  } catch (e) {
    return res.json(e);
  }
};

const authenticate = async (req, res) => {
  try {
    const u_service = new UserService(_db);
    const usr = await u_service.auth(req.body.username, req.body.passowrd);
    return res.json(usr);
  } catch (e) {
    return res.json(e);
  }
}


export default {
  get,
  create,
  list,
  authenticate
};

