export class User {
  email: string;

  constructor(email: string) {
    this.email = email;
  }

  validateEmailAdress(): boolean {
    const pattern = new RegExp('/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/');
    return pattern.test(this.email);
  }
}
