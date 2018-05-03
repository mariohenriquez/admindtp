export class TimeService {

    twelveHoursClock(): any[] {
        let clock = [];
        for (let hour = 0; hour < 24; hour++) {
            let fixedHour = hour % 12;
            let meridian = hour > 11 ? "P.M." : "A.M.";

            fixedHour = fixedHour == 0 ? 12 : fixedHour;

            clock.push({ label: `${fixedHour}:00 ${meridian}`, value: `${fixedHour}:00 ${meridian}` })
            clock.push({ label: `${fixedHour}:30 ${meridian}`, value: `${fixedHour}:30 ${meridian}` })
        }
        clock.push({ label: `11:59 P.M.`, value: '11:59 P.M.' })
        return clock;
    }

    twentyFourHours(): any[] {
        let hours = []
        for (let hour = 1; hour < 25; hour++) {
            hours.push({ label: `${hour == 1 ? hour + " Hour" : hour + " Hours"}`, value: hour })
        }
        return hours;
    }

    hourLabelFor(hour: number): string {
        let hourLabel = this.twentyFourHours().find(h => {
            return h.value == hour
        });
        return hourLabel ? hourLabel.label : "0 Hours";
    }

    encodeHour(rawHour: number, maxRangeValue?: number): string {
        let hourValue = rawHour / (maxRangeValue / 24)
        let hour = (hourValue > 12) ? parseInt('' + hourValue) % 12 : parseInt('' + hourValue);
        let minutes = hourValue * 60 % 60;
        let clock = (hourValue >= 12) ? "P.M." : "A.M."
        if (hour == 0) {
            hour = 12
            clock = "A.M."
        }
        if (maxRangeValue == rawHour) {
            hour = 11
            minutes = 59
            clock = "P.M."
        }
        return `${hour < 10 ? "0" + hour : hour}:${minutes < 10 ? "0" + minutes : minutes} ${clock}`;
    }

    decodeHour(hourEncoded: string): number {
        let time = hourEncoded.split(" ")[0]
        let clock = hourEncoded.split(" ")[1]


        let minutes = parseInt(time.split(":")[1])
        let hour = parseInt(time.split(":")[0])

        if (clock == "A.M." && hour == 12 && minutes == 0) {
            return 0
        }

        if (clock == "P.M." && hour == 11 && minutes == 59) {
            return 96
        }

        let result = (hour * 4)
        result = clock == "P.M." && hour != 12 ? result + 48 : result
        result = result + (minutes / 15)

        return result
    }
}
