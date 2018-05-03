import { AvailabilityRule } from "./availability-rule";

export class SpotGroup {
  id: number;
  spotsNumber: number;
  rules: AvailabilityRule[];
  trashBtn: boolean;
  schedule: any;

  constructor() {
    this.id = 0;
    this.spotsNumber = 1;
    this.trashBtn = true;
    this.rules = [new AvailabilityRule()];
  }

  valid(): Error {
    if (this.spotsNumber == 0 || this.spotsNumber == null) {
      return Error("A value for a spot group is empty or equal to zero")
    }

    if(this.overlapRules()){
      return Error("There are some rules overlapping with hours for a spot group")
    }

    return this.rules.map(rule => rule.valid()).find(e => e !== undefined)
  }

  normalize() {
    this.rules.forEach(rule => rule.normalize())
  }

  private overlapRules(): boolean {
    let rules = this.rules;
    return rules.some(ruleToCompare => {
      return rules.some(rule => {
        return ruleToCompare.overlapsWith(rule)
      });
    })
  }
}
