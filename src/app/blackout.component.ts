import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Blackout } from './model/blackout'
import { TimeService } from './services/time.service';
import { AvailabilityRule } from './model/availability-rule'
import { HolidayService } from './services/holiday.service'
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'blackout',
  template: require('./blackout.component.html')
})
export class BlackoutComponent {
  @Output() onDeleteBlackout: EventEmitter<any> = new EventEmitter();

  private hours = [];
  private holidaysList: SelectItem[] = [];
  private inputBlackout: Blackout;
  private selectedRange: number[] = [32, 72];
  private maxRangeValue: number = 96;

  constructor(private holidayService: HolidayService, private timeService: TimeService) {
    this.hours = this.timeService.twelveHoursClock()
    this.holidayService.all().forEach(holiday => {
      this.holidaysList.push({ value: holiday, label: holiday })
    })
  }

  delete() {
    this.onDeleteBlackout.emit(this.inputBlackout);
  }

  adjustHours(e: any) {
    this.inputBlackout.fromStartHour = this.timeService.encodeHour(e.values[0], this.maxRangeValue);
    this.inputBlackout.toEndHour = this.timeService.encodeHour(e.values[1], this.maxRangeValue);
  }

  fromHour(): string {
    return this.inputBlackout.fromStartHour
  }

  toHour(): string {
    return this.inputBlackout.toEndHour
  }

  @Input('blackout')
  set blackout(blackout: Blackout) {
    this.inputBlackout = blackout;
    this.selectedRange = [this.timeService.decodeHour(blackout.fromStartHour), this.timeService.decodeHour(blackout.toEndHour)];
  }

  allDayChanged($event) {
    this.inputBlackout.allDay = $event.target.checked

    if (this.inputBlackout.allDay) {
      this.selectedRange = [0, 96];
      this.inputBlackout.fromStartHour = "12:00 A.M.";
      this.inputBlackout.toEndHour = "11:59 P.M.";
    }
  }

  holidayDefault(){
    this.inputBlackout.fromStartHour = "08:00 A.M.";
    this.inputBlackout.toEndHour = "06:00 P.M.";
    this.selectedRange = [32, 72];
    this.inputBlackout.allDay = false;
  }
}
