import { ParkingLotService } from './services/parking-lot.service';
import { Component, OnInit } from '@angular/core';
import { ParkingLot } from './model/parking-lot';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'parking-lots',
  template: require('./parking-lots.component.html')
})
export class ParkingLotsComponent {

  parkingLots: ParkingLot[] = [];
  parkingLotsAtomic: ParkingLot[] = [];
  showTabContent = 2;
  messageBlankState: boolean;

  constructor(private http: Http, private router: Router, private parkingLotsService: ParkingLotService, private userService: UserService) {
    var body = document.getElementsByTagName('body')[0]
    body.className = "";
  }

  ngOnInit() {
    let role = this.userService.acronymRoleFor(this.userService.role())
    if (role === 'PLM' || role === 'TTD') {
      this.parkingLotsService.findParkingLotsForCurrentUser().subscribe(parkingLots => {
        this.parkingLots = parkingLots
        Object.assign(this.parkingLotsAtomic, this.parkingLots)
      })
      return;
    }
    this.parkingLotsService.findAll().subscribe(parkingLots => {
      this.parkingLots = parkingLots;
      Object.assign(this.parkingLotsAtomic, this.parkingLots)
    });
  }

  deleteLot(id: number) {
    let answer = confirm('Are you sure you want to delete this?')
    if (!answer) {
      return
    }

    let apiURL = process.env.API_URL;
    this.parkingLotsService.delete(id).subscribe(response => {
      this.removeFromLotList(id)
    });
  }

  removeFromLotList(id: number) {
    let index = -1;
    for (let i = 0; i < this.parkingLots.length; i++) {
      if (this.parkingLots[i].id == id) {
        index = i;
        break
      }
    }
    this.parkingLots.splice(index, 1);
  }

  search(text: string) {
    this.parkingLots = this.parkingLotsAtomic.filter(pl => {
      let matchName = this.matches(pl.name, text)
      let matchPSO = this.matches(pl.pso.name, text)
      let matchAddress = this.matches(pl.address, text)
      return matchName || matchPSO || matchAddress
    });
    this.messageBlankState = true;
  }

  matches(origin: string, source: string): boolean {
    return origin.toLowerCase().indexOf(source.toLowerCase()) != -1;
  }

  initialLetterForPSO(parkingLot: ParkingLot): string {
    return parkingLot.pso.name.charAt(0).toUpperCase()
  }

  btnTabContent(currentTab) {
    this.showTabContent = currentTab;
  }
}
