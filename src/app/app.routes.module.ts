import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from '../app/services/logged-in-guard';
import { ParkingLotsComponent } from './parking-lots.component';


const routes: Routes = [
    {
        path: 'inventory',
        children: [
            { path: 'parking-lots', component: ParkingLotsComponent },
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