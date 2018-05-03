import { ParkingLot } from './parking-lot';
import { File } from "./file";

export class Report {
  id: number
  parkingLotID: number
  createdAt: Date;
  reason: string
  method: string
  towingCompany: string
  state: string
  vehicleID: number
  imagesURL: string
  additionalInformation: string
  vehicle: any;
  user: any;
  files: File[] = [new File()];
  parkingLot: ParkingLot;
  history: any[];

  constructor() {
    this.id = 0;
    this.createdAt = new Date();
    this.parkingLotID = 0;
    this.reason = 'New Offender';
    this.method = 'Tow';
    this.towingCompany = 'ABC Towing Company';
    this.vehicleID = 0;
    this.imagesURL = '';
    this.additionalInformation = '';
    this.state = '';
    this.user = {};
    this.vehicle = { stateOfPlate: 'AL', year: new Date().getFullYear()};
    this.history = [];
  }

  valid(): Error {
    return null;
  }

  setupImagesURL() {
    let urls = []
    this.files.forEach(f => {
        if (f.selected() == false) {
            return
        }

        urls.push(`reports/${this.id}/images/${f.details.name}`);
    })
    
    this.imagesURL = urls.join();
  }
}

