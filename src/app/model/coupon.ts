import { ParkingLot } from './parking-lot';

export class Coupon {
    id: number;
    textCode: string;
    expirationDate: Date;
    ammountOff: number;
    percentOff: number;
    reservationTypes: string[];
    parkingLots: ParkingLot[];
    parkingLotsIds: number[];
    expires: boolean;
    unlimited: boolean;
    total: number;
    history: Object;
    quantityPerCustomer: number;
    unlimitedCustomerUse: boolean;

    constructor() {
        this.id = 0;
        this.textCode = '';
        this.expirationDate = new Date();
        this.ammountOff = 0;
        this.percentOff = 0;
        this.reservationTypes = [];
        this.parkingLots = [];
        this.expires = false;
        this.unlimited = false;
        this.parkingLotsIds = [];
        this.total = 0;
        this.history = {
            coupons:[]
        };
        this.quantityPerCustomer = 0;
        this.unlimitedCustomerUse = false;
    }
}

