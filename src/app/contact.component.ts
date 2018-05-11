import { validateConfig } from '@angular/router/src/config';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Contact} from './model/contact';

@Component({
  selector: 'contact',
  template: require('./contact.component.html')
})
export class ContactComponent {
    @Input() contact: Contact;
    @Input() index: number = 0;

    @Output() onDelete: EventEmitter<any> = new EventEmitter();

    delete() {
        this.onDelete.emit(this.contact);
    }
}
