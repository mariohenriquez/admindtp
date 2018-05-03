import { SpotGroup } from "./spot-group"
import { Blackout } from "./blackout"
import { PSO } from "./pso"
import { File } from "./file";
import { Pricing } from "./pricing";
import { Contact } from "./contact"

export class ParkingLot {
    id: number;
    name: string;
    address: string;
    spotsNumber: number;
    spotGroups: SpotGroup[];
    hourlyPrice: number;
    overnightPrice: number;
    dailyPrice: number;
    weekendPrice: number;
    monthlyPrice: number;
    dailyMax: number;
    hasDailyMax: boolean;
    dailyMaxTime: number;
    blackouts: Blackout[];
    pso: PSO;
    contacts: Contact[];
    aditionalInformation: string;
    active: boolean;

    latitude: number = 42.351781;
    longitude: number = -71.056737;

    imagesURL: string;
    files: File[] = [new File()];
    pricing: Pricing;

    constructor() {
        this.id = 0;
        this.name = "";
        this.spotsNumber = 1;
        this.address = "";
        this.hourlyPrice = 1;
        this.dailyPrice = 0;
        this.overnightPrice = 0;
        this.weekendPrice = 0;
        this.monthlyPrice = 0;
        this.dailyMax = 0;
        this.hasDailyMax = false;
        this.dailyMaxTime = 1;
        this.pso = new PSO();
        this.spotGroups = [new SpotGroup()];
        this.blackouts = [];
        this.imagesURL = "";
        this.pricing = new Pricing();
        this.contacts = [];
        this.aditionalInformation = "";
        this.active = true;
    }

    DTPSpotsNumber() {
        if (this.spotGroups == null) {
            return 0;
        }
        return this.spotGroups.reduce((total, spotGroup) => {
            return total + spotGroup.spotsNumber;
        }, 0);
    }

    setupImagesURL() {
        let urls = []
        this.files.forEach(f => {
            if (f.selected() == false) {
                return
            }

            urls.push(`parking-lots/${this.id}/images/${f.details.name}@${f.details.orientation}`);
        })


        this.imagesURL = urls.join();
    }

    valid(): Error {
        if(this.totalSpotsNumberForSpotGroups() > this.spotsNumber) {
            return Error("Total for spots numbers in groups is greater than parking lot capacity")
        }

        let error:Error;

        error = this.blackouts.map(blackout => blackout.valid()).find(e => e !== undefined)
        if (error !== undefined) return error;

        error = this.spotGroups.map(group => group.valid()).find(e => e !== undefined)
        if (error !== undefined) return error;

        if (this.pricing.hourly === false &&
            this.pricing.daily === false &&
            this.pricing.overnight === false &&
            this.pricing.weekendFriSun === false &&
            this.pricing.weekendFriMon === false &&
            this.pricing.weeklyMonToFri === false &&
            this.pricing.weeklySevenDays === false &&
            this.pricing.monthly === false &&
            this.pricing.twentyFour === false) {
            return Error("Please choose at least a pricing type.")
        }
    }

    totalSpotsNumberForSpotGroups(): number {
        return this.spotGroups.map(spotGroup => spotGroup.spotsNumber).reduce((p, c) => parseInt(`${p}`, 10) + parseInt(`${c}`, 10));
    }

    normalize() {
        this.blackouts.forEach(blackout => blackout.normalize())
        this.spotGroups.forEach(group => group.normalize())
    }
}
