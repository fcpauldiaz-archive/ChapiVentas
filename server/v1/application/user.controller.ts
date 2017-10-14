import { User } from '../domain/user.model';
import { UserService } from './services/user.service';
import _db  from './persistence/db.repository';

import { StatsD } from 'node-statsd/lib/statsd';

var client = new StatsD({
  host: 'ec2-52-90-161-71.compute-1.amazonaws.com'
})

/**
 * Get user
 * @returns {User}
 */
const get = async (req, res) => {
  let startingDate = new Date();
  try {
    const u_service = new UserService(_db);
    const user = await u_service.buscarUsuario(req.params.username);

    client.increment('users_get_success');
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('users_get_response_time', timeDiff);

    return res.json(user);
  } catch (e) {

    client.increment('users_get_error');
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('users_get_response_time', timeDiff);

    return res.json(e);
  }
};

/**
 * Get user
 * @returns {User}
 */
const list = async (req, res) => {
  let startingDate = new Date();
  try {
    const u_service = new UserService(_db);
    const user = await u_service.obtenerUsuarios();

    client.increment('users_list_success');
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('users_list_response_time', timeDiff);

    return res.json(user);
  } catch (e) {
    client.increment('users_list_error');
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('users_list_response_time', timeDiff);
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
  let startingDate = new Date();
  try {
    const user = new User(req.body.username, req.body.password);
    const u_service = new UserService(_db);
    const usr = await u_service.save(user);

    client.increment('users_create_success');
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('users_create_response_time', timeDiff);

    return res.json(usr);
  } catch (e) {

    client.increment('users_create_error');
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('users_create_response_time', timeDiff);

    return res.json(e);
  }
};

const authenticate = async (req, res) => {
  let startingDate = new Date();
  try {
    const u_service = new UserService(_db);
    const usr = await u_service.auth(req.body.username, req.body.passowrd);

    client.increment('users_authenticate_success');
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('users_authenticate_response_time', timeDiff);

    return res.json(usr);
  } catch (e) {

    client.increment('users_authenticate_error');
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('users_authenticate_response_time', timeDiff);

    return res.json(e);
  }
};

const deleteUser = async (req, res) => {
  let startingDate = new Date();
  try {
    const u_service = new UserService(_db);
    const usr = await u_service.eliminarUsuario(req.params.userId);

    client.increment('users_delete_success');
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('users_delete_response_time', timeDiff);

    return res.json(usr);
  } catch (e) {

    client.increment('users_delete_error');
    let timeDiff = (new Date()).valueOf() - (startingDate).valueOf()
    client.timing('users_delete_response_time', timeDiff);

    return res.json(e);
  }
};


export default {
  get,
  create,
  list,
  authenticate,
  deleteUser
};

