import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignUpComponent } from './components/signup/signup.component';
import { UserComponent } from './components/user/user.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UpcomingBookingsComponent } from './components/upcoming-bookings/upcoming-bookings.component';
import { CompletedBookingsComponent } from './components/completed-bookings/completed-bookings.component';
import { AllBookingsComponent } from './components/all-bookings/all-bookings.component';
import { NewBookingComponent } from './components/new-booking/new-booking.component';
import { AllTheatresComponent } from './components/all-theatres/all-theatres.component';
import { AllMoviesComponent } from './components/all-movies/all-movies.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TheaterAdminComponent } from './components/theater-admin/theater-admin.component';
import { SuperAdminComponent } from './components/super-admin/super-admin.component';
import { TheaterActionsComponent } from './components/theater-actions/theater-actions.component';
import { MovieBookingComponent } from './components/movie-booking/movie-booking.component';
import { MovieMarketplaceComponent } from './components/movie-marketplace/movie-marketplace.component';
import { ToastComponent } from './components/toast/toast.component';
import { ShowComponent } from './components/show/show.component';
import { TheaterListComponent } from './components/theater-list/theater-list.component';
import { LeadingZerosPipe } from './pipes/leading-zeros/leading-zeros.pipe';
import { ClockFormat12Pipe } from './pipes/clock-format/clock-format-12.pipe';
import { ClockFormat24Pipe } from './pipes/clock-format/clock-format-24.pipe';
import { MinutesToHhmmPipe } from './pipes/time/minutes-to-hhmm/minutes-to-hhmm.pipe';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    SignUpComponent,
    UserComponent,
    PageNotFoundComponent,
    UpcomingBookingsComponent,
    CompletedBookingsComponent,
    AllBookingsComponent,
    NewBookingComponent,
    AllTheatresComponent,
    AllMoviesComponent,
    TheaterAdminComponent,
    SuperAdminComponent,
    TheaterActionsComponent,
    MovieBookingComponent,
    MovieMarketplaceComponent,
    ToastComponent,
    ShowComponent,
    TheaterListComponent,
    LeadingZerosPipe,
    ClockFormat12Pipe,
    ClockFormat24Pipe,
    MinutesToHhmmPipe,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
