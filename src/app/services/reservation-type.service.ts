import { SelectItem } from 'primeng/primeng';

export class ReservationTypesService {

    private types: SelectItem[] = [];

    reservationTypes(): any[] {
        this.types = [];
        this.types.push({ label: 'Hourly', value: 'Hourly' });
        this.types.push({ label: 'Daily', value: 'Daily' });
        this.types.push({ label: 'Overnight', value: 'Overnight' });
        this.types.push({ label: '24 Hours', value: '24 Hours' });
        this.types.push({ label: 'Weekend(Fri-Sun)', value: 'Weekend(Fri-Sun)' });
        this.types.push({ label: 'Weekend(Fri-Mon)', value: 'Weekend(Fri-Mon)' });
        this.types.push({ label: 'Weekly(5 Days)', value: 'Weekly(5 Days)' });
        this.types.push({ label: 'Weekly(7 Days)', value: 'Weekly(7 Days)' });
        this.types.push({ label: 'Monthly(1 or more months)', value: 'Monthly(1 or more months)' });
        this.types.push({ label: 'Monthly(Recurring)', value: 'Monthly(Recurring)' });

        return this.types;
    }
}
