export class Blackout {
    id:             number;
    spotsNumber:    number;
    fromDate:       Date;
    fromStartHour:  string;
    toDate:         Date;
    toEndHour:      string;
    allDay:         boolean;
    kind:           string;
    holidays:       string[];

    constructor() {
        this.id = 0;
        this.spotsNumber = 1;
        this.fromDate = new Date();
        this.fromStartHour = "08:00 A.M.";
        this.toDate = new Date();
        this.toEndHour = "06:00 P.M.";
        this.allDay = false;
        this.kind = "DATE_RANGE"
        this.holidays = [];
    }

    valid():Error {
       if(this.kind == 'HOLIDAY' && (this.holidays.length == 0 || this.holidays[0] == undefined)) {
           return Error("Holidays for blackouts must be defined")
       }
    }

    normalize() {
        if(this.kind != 'HOLIDAY') {
            this.holidays = []
        }
    }
}
