import { Component, Input, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'order-column',
    template: require('./order-column.component.html')
})
export class OrderColumnComponent {
    @Input() list: any[];
    @Input() attr: string = '';
    @Input() type: string = '';
    @Input() sorter: any;

    private attrTmp: string;

    constructor() { }

    order(asc: boolean) {
        if (this.sorter !== undefined) {
            this.list.sort((a, b): number => {
                return this.sorter(a, b, asc);
            });
            return false;
        }

        this.list.sort((a, b): number => {
            a = this.normalizeAttr(a);
            b = this.normalizeAttr(b);
            if (this.type === 'number') {
                return this.orderNumber(a, b, asc);
            }

            if (this.type === 'date') {
                return this.orderDate(a, b, asc);
            }

            return asc ? a[this.attrTmp].localeCompare(b[this.attrTmp]) :
                b[this.attrTmp].localeCompare(a[this.attrTmp]);
        });
        return false;
    }

    private normalizeAttr(e) {
        this.attrTmp = this.attr;
        if (this.attrTmp.indexOf(".") === -1) return e;
        let attrs = this.attrTmp.split(".")
        for (let i = 0; i < attrs.length - 1; i++) {
            e = e[attrs[i]];
        }
        this.attrTmp = attrs[attrs.length - 1];
        return e;
    }

    private orderNumber(a, b, asc: boolean): number {
        if (asc) {
            if (a[this.attrTmp] > b[this.attrTmp]) return 1;
            if (a[this.attrTmp] < b[this.attrTmp]) return -1;
            if (a[this.attrTmp] === b[this.attrTmp]) return 0;
        } else {
            if (a[this.attrTmp] > b[this.attrTmp]) return -1;
            if (a[this.attrTmp] < b[this.attrTmp]) return 1;
            if (a[this.attrTmp] === b[this.attrTmp]) return 0;
        }
    }

    private orderDate(a, b, asc: boolean): number {
        if (asc) {
            if (moment(a[this.attrTmp]).isAfter(moment(b[this.attrTmp]))) return 1;
            if (moment(a[this.attrTmp]).isBefore(moment(b[this.attrTmp]))) return -1;
            if (moment(a[this.attrTmp]).isSame(moment(b[this.attrTmp]))) return 0;
        } else {
            if (moment(a[this.attrTmp]).isAfter(moment(b[this.attrTmp]))) return -1;
            if (moment(a[this.attrTmp]).isBefore(moment(b[this.attrTmp]))) return 1;
            if (moment(a[this.attrTmp]).isSame(moment(b[this.attrTmp]))) return 0;
        }
    }
}
