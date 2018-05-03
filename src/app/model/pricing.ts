export class Pricing {
    id: number;
    parkingLotID: number;

    // Hourly Pricing
    hourlyPrice: number;
    hourlyHasDailyMax: boolean;
    hourlyMaxPrice: number;
    hourlyMaxTime: number;

    // Daily Pricing
    dailyPrice: number;
    dailyStartHour: string;
    dailyEndHour: string;

    // Overnight Pricing
    overnightPrice: number;
    overnightStartHour: string;
    overnightEndHour: string;

    // 24 Hours Pricing
    twentyFourPrice: number;

    // Weekend Pricing
    weekendFriSunPrice: number;
    weekendFriMonPrice: number;

    // Weekly Pricing
    weeklyMonToFriPrice: number;
    weeklySevenDaysPrice: number;

    // Monthly Pricing
    monthlyPrice: number;
    monthlyFirstDayOfMonth: boolean;
    monthlyFifteenthDayOfMonth: boolean;

    //Activations options
    hourly: boolean;
    daily: boolean;
    overnight: boolean;
    weekendFriSun: boolean;
    weekendFriMon: boolean;
    weeklyMonToFri: boolean;
    weeklySevenDays: boolean;
    monthly: boolean;
    twentyFour: boolean;

    constructor() {
        this.id = 0;
        this.parkingLotID = 0;
        this.hourlyPrice = 0
        this.hourlyHasDailyMax = false;
        this.hourlyMaxPrice = 1;
        this.hourlyMaxTime = 1;
        this.dailyPrice = 0;
        this.dailyStartHour = "12:00 A.M";
        this.dailyEndHour = "11:59 P.M";
        this.overnightPrice = 0;
        this.overnightStartHour = "12:00 A.M";
        this.overnightEndHour = "6:00 A.M";
        this.weekendFriSunPrice = 0;
        this.weekendFriMonPrice = 0;
        this.weeklyMonToFriPrice = 0;
        this.weeklySevenDaysPrice = 0;
        this.monthlyPrice = 0;
        this.twentyFourPrice = 0;
        this.monthlyFirstDayOfMonth = false;
        this.monthlyFifteenthDayOfMonth = false;
        this.hourly = true;
        this.daily = false;
        this.overnight = false;
        this.weekendFriSun = false;
        this.weekendFriMon = false;
        this.weeklyMonToFri = false;
        this.weeklySevenDays = false;
        this.monthly = false;
        this.twentyFour = false;
    }
}

