import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from '../app/services/logged-in-guard';
import { ParkingLotsComponent } from './parking-lots.component';
import { ParkingLotComponent } from './parking-lot.component';
import { LoginComponent } from './login.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'inventory',
        children: [
            { path: 'parking-lots', component: ParkingLotsComponent },
            { path: 'parking-lot/new', component: ParkingLotComponent },
            { path: 'parking-lot/:id', component: ParkingLotComponent },
        ],
        canActivate: [LoggedInGuard]
        },
    { path: '**', pathMatch: 'full', redirectTo: 'inventory/parking-lots' }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutesModule { }