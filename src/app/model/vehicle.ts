export class Vehicle {
    ID: number;
    id: number;
    color: string;
    customerID: number;
    isDefault: Boolean;
    maker: string;
    model: string;
    plate: string;
    stateOfPlate: string;
    year: number;

    constructor() {
        this.id = 0;
        this.ID = 0;
        this.color = '';
        this.customerID = 0;
        this.isDefault = false;
        this.maker = '';
        this.model = '';
        this.plate = '';
        this.stateOfPlate = '';
        this.year = 0;
    }
}

