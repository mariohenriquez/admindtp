export class Contact {
  id:                 number;
  name:               string;
  phoneNumber:        string;
  mobilePhoneNumber:  string;
  email:              string;
  title:              string;

  constructor() {
    this.id = 0;
    this.name = "";
    this.phoneNumber = "";
    this.mobilePhoneNumber = "";
    this.email = "";
    this.title = "";
  }

  valid(): Error {
    if(this.phoneNumber == "" || this.title == "" || this.email == "" || this.name == ""){
      return Error("Contacts requires all fields to be filled")
    }
  }
}
