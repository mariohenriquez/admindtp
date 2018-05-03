import { Vehicle } from './vehicle';

export class Customer {
    email: string;
    id: number;
    lastName: string;
    mobileNumber: string;
    name: string;
    oldPassword: string;
    password: string;
    paymentInformations: string[];
    registeredAt: Date;
    reservations: Object[];
    secretCodes: string;
    totalReservations: number;
    updatedAt: Date;
    vehicles: Vehicle[];

    constructor() {
        this.email = '';
        this.id = 0;
        this.lastName = '';
        this.mobileNumber = '';
        this.name = '';
        this.oldPassword = '';
        this.password = '';
        this.paymentInformations = [];
        this.registeredAt = new Date();
        this.reservations = [];
        this.secretCodes = '';
        this.totalReservations = 0;
        this.updatedAt = new Date();
        this.vehicles = [];
    }
}

