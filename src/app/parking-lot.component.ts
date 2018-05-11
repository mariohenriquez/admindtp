import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { ParkingLot } from './model/parking-lot';
import { SpotGroup } from './model/spot-group';
import { File } from './model/file';
import { Blackout } from './model/blackout';
import { Pricing } from './model/pricing';
import { CalendarModule, SliderModule, DropdownModule } from 'primeng/primeng';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ParkingLotService } from './services/parking-lot.service';
import { PSOService } from './services/pso.service';
import { AvailabilityRuleComponent } from './availability-rule.component';
import { SelectItem } from 'primeng/primeng';
import { UploadService } from './services/upload.service';
import { HolidayService } from './services/holiday.service';
import { TimeService } from './services/time.service';
import { Contact } from './model/contact';

@Component({
    selector: 'parking-lot',
    template: require('./parking-lot.component.html')
})

export class ParkingLotComponent implements OnInit {
    id: number = 0;
    submitted = false;
    parkingLot: ParkingLot;
    private alertMessage: string = "";

    private psos: SelectItem[];
    private hours: SelectItem[];
    private selectedHour: string;

    showTabContent = 1;

    constructor(private http: Http,
        private router: Router,
        private route: ActivatedRoute,
        private parkingLotService: ParkingLotService,
        private psoService: PSOService,
        private uploadService: UploadService,
        private holidayService: HolidayService,
        private timeService: TimeService) {

        this.parkingLot = new ParkingLot();

        let defaultSpotGroup = this.parkingLot.spotGroups[0];
        defaultSpotGroup.id = 1;
        defaultSpotGroup.rules[0].id = `10`;
        this.id = this.route.snapshot.params["id"];

        if (this.id != undefined) {
            this.parkingLotService.find(this.id).subscribe(parkingLots => {
                this.loadParkingLot(parkingLots[0])
            });
        } else {
            this.id = 0;
        }
    }

    ngOnInit() {
        this.fillPSOItems();
    }

    fillPSOItems() {
        this.psoService.findAll().subscribe(psos => {
            this.psos = [];
            for (let psoIndex in psos) {
                let pso = psos[psoIndex]
                this.psos.push({ label: `${pso.name}`, value: `${pso.name}` })
            }
            if (this.id == 0 && this.psos.length > 0) {
                this.parkingLot.pso = psos[0];
            }
        });
    }

    onSubmit() {
        this.submitted = true;
    }

    isNewLot(): boolean {
        let result = this.id == 0;
        return result;
    }

    setDailyMaxTime(dailyMaxTime: any) {
        this.parkingLot.pricing.hourlyMaxTime = parseInt(dailyMaxTime.value);
    }

    addSpot(): boolean {
        let spotGroup = new SpotGroup();
        spotGroup.id = this.parkingLot.spotGroups.length + 1;

        let defaultRule = spotGroup.rules[0];
        defaultRule.id = `${spotGroup.id}0`;

        this.parkingLot.spotGroups.push(spotGroup);

        if (this.parkingLot.spotGroups.length == 1) {
            this.parkingLot.spotGroups[0].trashBtn = false;
        } else {
            this.parkingLot.spotGroups[0].trashBtn = true;
        }
        return false;
    }

    deleteSpotGroup(spotGroup: SpotGroup) {
        var spotsGroup = this.parkingLot.spotGroups;
        if (spotsGroup.length > 1) {
            var index = spotsGroup.indexOf(spotGroup);
            spotsGroup.splice(index, 1);
        }

        if (this.parkingLot.spotGroups.length == 1) {
            this.parkingLot.spotGroups[0].trashBtn = false;
        } else {
            this.parkingLot.spotGroups[0].trashBtn = true;
        }
    }

    create() {
        this.validateAnd(() => {
            var apiURL = process.env.API_URL;
            this.parkingLot.active = true;
            this.parkingLot.spotGroups.forEach(sg => {
                sg.spotsNumber = parseInt(`${sg.spotsNumber}`);
            });
            this.parkingLotService.save(this.parkingLot).subscribe(res => {
                this.parkingLot.id = res[0].id;
                this.parkingLot.setupImagesURL();
                this.uploadService.handleFileUploads(this.parkingLot.files, `parking-lots/${this.parkingLot.id}/images`);
                this.parkingLotService.update(this.parkingLot).subscribe();
                this.router.navigate([`/inventory/parking-lot/detail/${res[0].id}`]);
            });
        })
    }
    update() {
        this.validateAnd(() => {
            var apiURL = process.env.API_URL;
            this.parkingLot.setupImagesURL();
            this.parkingLot.spotGroups.forEach(sg => {
                sg.spotsNumber = parseInt(`${sg.spotsNumber}`);
            });
            this.parkingLotService.update(this.parkingLot).subscribe(res => {
                this.uploadService.handleFileUploads(this.parkingLot.files, `parking-lots/${res[0].id}/images`);
                this.router.navigate([`/inventory/parking-lot/detail/${res[0].id}`]);
            });
        })
    }

    validateAnd(callback: () => void) {
        let error: Error = this.parkingLot.valid()
        
        if (error !== undefined) {
            this.alertMessage = error.message;
            return
        }
        
        this.parkingLot.normalize();
        callback()
    }

    addBlackout(): boolean {
        this.parkingLot.blackouts.push(new Blackout());
        return false;
    }

    deleteBlackout(blackout: Blackout) {
        var blackoutItem = this.parkingLot.blackouts;
        if (blackoutItem.length > 0) {
            var index = blackoutItem.indexOf(blackout);
            blackoutItem.splice(index, 1);
        }
    }

    btnTabContent(currentTab) {
        this.showTabContent = currentTab;
    }

    loadParkingLot(parkingLot: ParkingLot) {
        this.parkingLot = parkingLot;
        this.selectedHour = `${this.parkingLot.dailyMaxTime}`;
        for (var i = 0; i < this.parkingLot.spotGroups.length; i++) {
            this.parkingLot.spotGroups[i].id = i + 1;

            for (let j = 0; j < this.parkingLot.spotGroups[i].rules.length; j++) {
                this.parkingLot.spotGroups[i].rules[j].id = `${i + 1}${j}`;
            }
        }
    }

    locationUpdated($event) {
        this.parkingLot.latitude = $event.latitude
        this.parkingLot.longitude = $event.longitude
    }

    removePicture(index: number) {
        if (index == 0 && this.parkingLot.files.length == 1) {
            return
        }
        this.parkingLot.files.splice(index, 1);
    }

    addFile(file: any) {
        this.parkingLot.files = this.parkingLot.files.concat([new File()])
    }

    allFilesSelected() {
        return this.parkingLot.files.some(f => { return f.selected() })
    }

    addContact() {
        this.parkingLot.contacts.push(new Contact())
        return false;
    }

    allContactsValid() {
        return this.parkingLot.contacts.every(c => {
            return c.valid() === undefined
        })
    }

    deleteContact(contact: Contact) {
        var contactItem = this.parkingLot.contacts;
        var index = contactItem.indexOf(contact);
        contactItem.splice(index, 1);
    }


}
