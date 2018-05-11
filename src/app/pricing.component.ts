import { Component, Input } from '@angular/core';
import { Pricing } from './model/pricing';
import { TimeService } from './services/time.service';
import { SelectItem } from 'primeng/primeng';

@Component({
    selector: 'pricing',
    template: require('./pricing.component.html')
})
export class PricingComponent {
    
    _pricing: Pricing;
    private hours: SelectItem[];
    private clock: SelectItem[];
    private selectedMaxPriceHour: string;
    private selectedMaxTimeHour: string;
    private maxPrice: number;

    constructor(private timeService: TimeService) {
        this.fillHoursItems();
        this.fillTimeItems();
        this.selectedMaxPriceHour = this.hours[0].value;
        this.selectedMaxTimeHour = this.hours[0].value;
        this.maxPrice = 0;
    }
    
    setDailyMaxTime(dailyMaxTime: any) {
        this._pricing.hourlyMaxTime = parseInt(dailyMaxTime.value);
    }

    setDailyMaxPrice(dailyMaxPrice: any) {
        this._pricing.hourlyMaxPrice = parseInt(dailyMaxPrice.value);
        this.calculateMaxPrice()
    }

    calculateMaxPrice() {
        this.maxPrice = this._pricing.hourlyPrice * this._pricing.hourlyMaxPrice;
    }

    fillHoursItems() {
        this.hours = this.timeService.twentyFourHours();
    }

    @Input('pricing')
    set pricing(pricing: Pricing) {
        this._pricing = pricing;
        this.selectedMaxPriceHour = `${this._pricing.hourlyMaxPrice}`
        this.selectedMaxTimeHour = `${this._pricing.hourlyMaxTime}`;
        this.calculateMaxPrice();
    }

     get pricing(): Pricing {
        return this._pricing;
     }

    fillTimeItems() {
        this.clock = this.timeService.twelveHoursClock()
    }
 }
