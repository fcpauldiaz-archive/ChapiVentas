export class User {

  username: string;
  password: string;
  email: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  validateEmailAdress(): boolean {
    const pattern = new RegExp('/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/');
    return pattern.test(this.email);
  }
}
