import { ParkingLot } from './parking-lot';

export class User {
  id: number;
  name: string;
  lastName: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  password: string;
  oldPassword: string;
  role: string;
  parkingLots: ParkingLot[];
  active: boolean;
  towingCompany: string;

  constructor() {
      this.id = 0;
      this.name = '';
      this.lastName = '';
      this.lastname = '';
      this.email = '';
      this.phoneNumber = '';
      this.password = '';
      this.oldPassword = '';
      this.role = '';
      this.active = true;
      this.towingCompany = '';
  }
}
