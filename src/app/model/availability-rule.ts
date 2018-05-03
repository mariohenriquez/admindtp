import { TimeService } from "../services/time.service";

export class AvailabilityRule {
  id: string;
  startHour: string;
  endHour: string;
  weekDays: string;
  allDay: boolean;
  enabled: boolean;
  customDay: Date;
  kind: string;
  holidays: string[];

  constructor() {
    this.id = "0";
    this.weekDays = "";
    this.startHour = "08:00 A.M.";
    this.endHour = "06:00 P.M.";
    this.allDay = false;
    this.enabled = true;
    this.customDay = undefined,
      this.kind = "WEEK_DAYS"
    this.holidays = [];
  }

  overlapsWith(rule: AvailabilityRule) {
    if (this.id == rule.id) return false;
    return this.overlapsWitHour(rule) &&
      this.sameWeekDaysWith(rule)
  }

  private overlapsWitHour(anotherRule: AvailabilityRule) {
    let timeService = new TimeService();

    let startHour = timeService.decodeHour(this.startHour);
    let endHour = timeService.decodeHour(this.endHour);

    let anotherStartHour = timeService.decodeHour(anotherRule.startHour);
    let anotherEndHour = timeService.decodeHour(anotherRule.endHour);

    return (anotherStartHour > startHour && anotherStartHour < endHour) || 
           (anotherEndHour > startHour && anotherStartHour < endHour)
  }

  private sameWeekDaysWith(rule: AvailabilityRule) {
    let weekDaysList = this.weekDays.split(",");
    return weekDaysList.some(wd => {
        return (wd != "") ? rule.weekDays.indexOf(wd) != -1 : false
    })
  }

  valid(): Error {
    if (this.weekDays == "" && this.kind == "WEEK_DAYS") {
      return Error("There are not week days defined for a rule")
    }

    if (this.kind == 'HOLIDAY' && (this.holidays.length == 0 || this.holidays[0] == undefined)) {
      return Error("Holidays for rule must be defined")
    }
  }

  normalize() {
    if (this.kind != 'HOLIDAY') {
      this.holidays = []
    }
  }
}
