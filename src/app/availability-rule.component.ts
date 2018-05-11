import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AvailabilityRule } from './model/availability-rule'
import { HolidayService } from './services/holiday.service'
import { TimeService } from './services/time.service'
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'availability-rule',
  template: require('./availability-rule.component.html')
})
export class AvailabilityRuleComponent {
  id: number = 0;

  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  private _rule: AvailabilityRule;
  private maxRangeValue: number = 96;

  private selectedRange: number[] = [32, 72];
  private selectedWeekDays: string[] = [];
  private holidays: SelectItem[] = [];

  constructor(private holidayService: HolidayService,
              private timeService: TimeService) {
      this.holidayService.all().forEach(holiday => {
        this.holidays.push({value: holiday, label: holiday})
      });
  }

  toggleWeekDays(day: string) {
    let selected = this.isDaySelected(day)
    if (selected) {
      var index = this.selectedWeekDays.indexOf(day);
      this.selectedWeekDays.splice(index, 1);
    } else {
      this.selectedWeekDays.push(day)
    }

    this.selectedWeekDays = Array.from(new Set(this.selectedWeekDays))
    this._rule.weekDays = this.selectedWeekDays.join(",");
  }

  isDaySelected(day: string): boolean {
    var index = this.selectedWeekDays.indexOf(day);
    return index != -1;
  }

  delete() {
    this.onDelete.emit(this._rule);
  }

  adjustHours(e: any) {
    this._rule.startHour = this.timeService.encodeHour(e.values[0], this.maxRangeValue);
    this._rule.endHour = this.timeService.encodeHour(e.values[1], this.maxRangeValue);
  }

  fromHour(): string {
    return this._rule.startHour
  }

  toHour(): string {
    return this._rule.endHour
  }

  get rule(): AvailabilityRule {
    return this._rule;
  }

  @Input('rule')
  set availabilityRule(rule: AvailabilityRule) {
    this._rule = rule;
    this.selectedWeekDays = this._rule.weekDays.split(",")
    this.selectedRange = [this.timeService.decodeHour(rule.startHour), this.timeService.decodeHour(rule.endHour)];
  }

  allDayChanged($event) {
    this._rule.allDay = $event.target.checked

    if (this._rule.allDay) {
      this.selectedRange = [0, 96];
      this._rule.startHour = "12:00 A.M.";
      this._rule.endHour = "11:59 P.M.";
    }

  }
}
