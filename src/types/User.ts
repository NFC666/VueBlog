export class User {
    username: string = "";
    email: string = "";
    avatarUrl?: string = "";
    passwordHash: string = "";
  
    constructor(username: string = "", email: string = "", passwordHash: string = "", avatarUrl?: string) {
      this.username = username;
      this.email = email;
      this.passwordHash = passwordHash;
      this.avatarUrl = avatarUrl;
    }
  }

