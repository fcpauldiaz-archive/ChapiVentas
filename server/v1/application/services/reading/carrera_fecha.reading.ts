export class DateCareerReadingService {

  _db: any;

  constructor(dbService: any) {
    this._db = dbService;
  }

  async getAllDateCareers() {
    return await this._db.dbList('date_career');
  }
}
