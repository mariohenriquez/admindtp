import { Contact } from "./contact";
import { File } from "./file";
import { ParkingLot } from "./parking-lot";

export class PSO {
    id:                   number;
    name:                 string;
    address:              string;
    contacts:             Contact[];
    notes:                string;
    paymentInstructions:  string;
    filesURL:             string;
    creditCardPayment:    boolean;
    secretCodePayment:    boolean;
    advertisementPayment: boolean;
    advertisementUrl:     string;
    secretCode:           string;
    advertisementFile:    File;

    files : File[] = [new File()];
    parkingLots : ParkingLot[] = [];

    constructor() {
        this.id = 0;
        this.name = '';
        this.address = '';
        this.contacts = [new Contact()];
        this.notes = '';
        this.paymentInstructions = '';
        this.filesURL = '';
        this.creditCardPayment = true;
        this.secretCodePayment = false;
        this.advertisementPayment = false;
        this.advertisementUrl = '';
        this.secretCode = '';
        this.advertisementFile = new File();
    }

    setupFilesURL() {
        let urls = []
        this.files.forEach(f => {
            if(!f.selected()){
                return
            }

            urls.push(`psos/${this.id}/files/${f.details.name}`);
        })
        this.filesURL = urls.join();
        if(this.advertisementFile.details !== undefined) {
            this.advertisementUrl = `psos/${this.id}/advertisement/${this.advertisementFile.details.name}`
        }
    }
}
