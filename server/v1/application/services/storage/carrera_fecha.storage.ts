export class DateCareerStorageService {

  _db: any;

  constructor(dbService: any) {
    this._db = dbService;
  }

  async save(date_career) {
    return await this._db.insertOne('date_career', (date_career));
  }
}
