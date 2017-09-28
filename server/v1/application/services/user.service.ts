export class UserService {

  _db: any;

  constructor(dbService: any) {
    this._db = dbService;
  }

  save(user) {
    return this._db.insertOne('user', (user));
  }

  async obtenerUsuarios() {
    return await this._db.dbList('user');
  }

  async buscarUsuario(username: string) {
    const users = await this._db.dbList('user');
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username) {
        return users[i];
      }
    }
    return {};
  }

  async auth(username: string, password: string) {
     const users = await this._db.dbList('user');
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username) {
        if (users[i].password == password) {
          return users[i];
        }
        return 'invalid password or username';
      }
    }
    return 'not_found';
  }


}
