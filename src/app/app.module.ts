import { AppRoutesModule } from './app.routes.module';
// import { TextMaskModule } from 'angular2-text-mask';
import { SecurityService } from '../app/services/security.service';
import { UserService } from '../app/services/user.service';
import { ParkingLotService } from '../app/services/parking-lot.service';
import { PSOService } from '../app/services/pso.service';
import { UploadService } from '../app/services/upload.service';
import { HolidayService } from '../app/services/holiday.service';
import { DashboardService } from '../app/services/dashboard.service';
import { TimeService } from '../app/services/time.service';
import { ReservationService } from '../app/services/reservation.service';
import { ReportService } from '../app/services/report.service';
import { CustomerService } from '../app/services/customer.service';
import { CouponService } from '../app/services/coupon.service';
import { VehicleService } from '../app/services/vehicle.service';
import { ReservationTypesService } from '../app/services/reservation-type.service';
import { PaymentInformationService } from '../app/services/payment-information.service';
import { ParkingLotsComponent } from './parking-lots.component';
// import { AvailabilityComponent } from '../app/pages/availability.component';
import { ParkingLotComponent } from './parking-lot.component';
import { SpotGroupComponent } from './spot-group.component';
import { AvailabilityRuleComponent } from './availability-rule.component';
// import { AvailabilityRangeComponent } from '../app/partials/availability-range.component';
// import { AvailabilityResultComponent } from '../app/partials/availability-result.component';
// import { AvailabilityResultDetailComponent } from '../app/partials/availability-result-detail.component';
import { PricingComponent } from './pricing.component';
import { NavigationComponent } from './navigation.component';
// import { PricingDetailComponent } from '../app/partials/pricing-detail.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../app/app.component';
import { LoginComponent } from './login.component';
// import { InvitationComponent } from '../app/pages/invitation.component';
// import { ResetPasswordComponent } from '../app/pages/reset-password.component';
import { RouterModule, Routes } from '@angular/router';
import { CalendarModule, SliderModule, DropdownModule, MultiSelectModule, AutoCompleteModule } from 'primeng/primeng';
import { HttpModule, JsonpModule, XHRBackend } from '@angular/http';
import { LoggedInGuard } from '../app/services/logged-in-guard';
import { AuthenticationConnectionBackend } from '../lib/authentication-connection-backend';
import { BlackoutComponent } from './blackout.component';
// import { DetailComponent } from '../app/pages/detail.component';
// import { PSOSComponent } from '../app/pages/psos.component';
// import { PSOComponent } from '../app/pages/pso.component';
import { ContactComponent } from './contact.component';
// import { FileDropComponent } from '../app/partials/file-drop.component';
// import { MoreComponent } from '../app/pages/more.component';
import { GeoLocationComponent } from './geo-location.component';
// import { AgmCoreModule } from 'angular2-google-maps/core';
import { ImageDropComponent } from './image-drop.component';
// import { ReservationsComponent } from '../app/pages/reservations.component';
// import { ReservationComponent } from '../app/pages/reservation.component';
// import { NewReservationComponent } from '../app/pages/reservation-new.component';
// import { FileChooseComponent } from '../app/partials/file-choose.component';
// import { ReportsComponent } from '../app/pages/reports.component';
// import { ReportComponent } from '../app/pages/report.component';
// import { ReportDetailComponent } from '../app/pages/report-detail.component';
// import { ProfileComponent } from '../app/pages/profile.component';
// import { ReservationDetailComponent } from '../app/pages/reservation-detail.component';
// import { CustomersComponent } from '../app/pages/customers.component';
// import { CustomerComponent } from '../app/pages/customer.component';
// import { CouponsComponent } from '../app/pages/coupons.component';
// import { CouponComponent } from '../app/pages/coupon.component';
// import { CouponDetailsComponent } from '../app/pages/coupon-details.component';
// import { FinancialComponent } from '../app/pages/financial.component';
// import { TeamMembersComponent } from '../app/pages/team-members.component';
// import { MemberComponent } from '../app/pages/member.component';
// import { EmployeesComponent } from '../app/pages/employees.component';
// import { CustomersMovementsComponent } from '../app/pages/customers-movements.component';
// import { DashboardComponent } from '../app/pages/dashboard.component';
import { OrderColumnComponent } from './order-column.component';
// import { DropdownComponent } from '../app/partials/dropdown.component';
// import { RatesComponent } from '../app/pages/rates.component';
import {Ng2PaginationModule} from 'ng2-pagination'; // <-- import the module
// import { RegisteredVehiclesComponent } from '../app/pages/registered-vehicles.component';

@NgModule({
    imports: [
        BrowserModule,
        CalendarModule,
        SliderModule,
        DropdownModule,
        MultiSelectModule,
        AutoCompleteModule,
        AppRoutesModule,
        // AgmCoreModule.forRoot({
        //     apiKey: process.env.GOOGLE_MAPS_API_KEY
        // }),
        HttpModule,
        JsonpModule,
        FormsModule,
        // TextMaskModule,
        Ng2PaginationModule                      
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        NavigationComponent,
        ParkingLotsComponent,
        ParkingLotComponent,
        GeoLocationComponent,
        SpotGroupComponent,
        AvailabilityRuleComponent,
        // AvailabilityComponent,
        // AvailabilityRangeComponent,
        // AvailabilityResultComponent,
        // AvailabilityResultDetailComponent,
        BlackoutComponent,
        // DetailComponent,
        // PSOSComponent,
        // PSOComponent,
        ContactComponent,
        // FileDropComponent,
        ImageDropComponent,
        // MoreComponent,
        PricingComponent,
        // PricingDetailComponent,
        // ReservationsComponent,
        // ReservationComponent,
        // NewReservationComponent,
        // FileChooseComponent,
        // ReportsComponent,
        // ReportComponent,
        // ReportDetailComponent,
        // ProfileComponent,
        // ReservationDetailComponent,
        // CustomersComponent,
        // CustomerComponent,
        // CouponsComponent,
        // CouponComponent,
        // CouponDetailsComponent,
        // FinancialComponent,
        // TeamMembersComponent,
        // InvitationComponent,
        // MemberComponent,
        // ResetPasswordComponent,
        // EmployeesComponent,
        // CustomersMovementsComponent,
        // DashboardComponent,
        OrderColumnComponent,
        // DropdownComponent,
        // RatesComponent,
        // RegisteredVehiclesComponent
    ],
    providers: [
        LoggedInGuard,
        ParkingLotService,
        PSOService,
        UserService,
        UploadService,
        SecurityService,
        HolidayService,
        TimeService,
        ReservationService,
        ReportService,
        CustomerService,
        CouponService,
        DashboardService,
        VehicleService,
        PaymentInformationService,
        ReservationTypesService,
        { provide: XHRBackend, useClass: AuthenticationConnectionBackend },
    ],
    exports: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
