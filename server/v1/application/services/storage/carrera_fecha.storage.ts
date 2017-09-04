export class DateCareerStorageService {

  _db: any;

  constructor(dbService: any) {
    this._db = dbService;
  }

  save(date_career) {
    return this._db.insertOne('date_career', (date_career));
  }
}
