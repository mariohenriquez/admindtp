import { ParkingLot } from './parking-lot';
import { Vehicle } from './vehicle';

export class Reservation {
    id: number;
    createdAt: Date;
    customer: Object;
    customerID: number;
    couponId: number;
    endsAt: Date;
    parkingLot: ParkingLot;
    parkingLotID: number;
    paymentMethod: string;
    price: number;
    referenceNumber: string;
    spaces: number;
    startsAt: Date;
    state: string;
    status: string;
    type: string;
    vehicles: Vehicle[];
    history: any[];
    noEditable: Boolean;
    paymentInformations: any[];
    originTotalPrice: number;

    constructor() {
        this.id = 0;
        this.createdAt = new Date();
        this.customer = {};
        this.customerID = 0;
        this.couponId = 0;
        this.endsAt = new Date();
        this.parkingLot = new ParkingLot();
        this.parkingLotID = 0;
        this.paymentMethod = '';
        this.price = 0;
        this.referenceNumber = '';
        this.spaces = 0;
        this.startsAt = new Date();
        this.state = '';
        this.status = '';
        this.type = '';
        this.vehicles = [];
        this.history = [];
        this.noEditable = false;
        this.paymentInformations = [];
        this.originTotalPrice = 0;
    }
}

