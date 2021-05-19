export class Employee {

  //let Eployee Model mach the api data

  constructor(id: number, name: string, email: string,first_name:string,last_name:string,avatar:string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.first_name=first_name;
    this.last_name=last_name;
    this.avatar=avatar;
  }

  id: number;
  last_name:string;
  avatar:string;
  name: string;
  email: string;
  first_name:string;

}
