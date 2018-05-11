import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SpotGroup } from './model/spot-group';
import { AvailabilityRule } from './model/availability-rule';

@Component({
  selector: 'spot-group',
  template: require('./spot-group.component.html')
})
export class SpotGroupComponent {

  @Input() spotGroup: SpotGroup;
  @Output() onDeleteRule: EventEmitter<any> = new EventEmitter();
  @Output() onDelete:     EventEmitter<any> = new EventEmitter();
  private mask = [/[1-9]/, /\d/, /\d/];

  addNewRule() {
    let rule = new AvailabilityRule();
    rule.id = `${this.spotGroup.id}${this.spotGroup.rules.length}`;
    this.spotGroup.rules.push(rule);
    return false;
  }

  deleteRule(rule: AvailabilityRule) {
    var rules = this.spotGroup.rules;
    if(rules.length > 1) {
        var index = rules.indexOf(rule);
        rules.splice(index, 1);
    } else {
      this.delete();
    }
  }

  delete() {
    this.onDelete.emit(this.spotGroup);
  }
}
