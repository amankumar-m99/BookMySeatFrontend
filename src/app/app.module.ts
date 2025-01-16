import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ImageCropperModule } from 'ngx-image-cropper';
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
import { TheaterListComponent } from './components/theater-list/theater-list.component';
import { LeadingZerosPipe } from './pipes/leading-zeros/leading-zeros.pipe';
import { ClockFormat12Pipe } from './pipes/clock-format/clock-format-12.pipe';
import { ClockFormat24Pipe } from './pipes/clock-format/clock-format-24.pipe';
import { MinutesToHHMMPipe } from './pipes/minutes-to-hhmm/minutes-to-hhmm.pipe';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SeatSelectionComponent } from './components/seat-selection/seat-selection.component';
import { TestComponent } from './components/test/test.component';
import { BookingViewComponent } from './components/booking-view/booking-view.component';
import { FallproofImageComponent } from './components/fallproof-image/fallproof-image.component';
import { SuperAdminMoviesComponent } from './components/super-admin-movies/super-admin-movies.component';
import { SuperAdminTheatersComponent } from './components/super-admin-theaters/super-admin-theaters.component';
import { SuperAdminUsersComponent } from './components/super-admin-users/super-admin-users.component';
import { SuperAdminAdminsComponent } from './components/super-admin-admins/super-admin-admins.component';
import { SuperAdminHomeComponent } from './components/super-admin-home/super-admin-home.component';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderButtonComponent } from './components/loader-button/loader-button.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ReleaseDatePhrasePipe } from './pipes/release-dates/release-date-phrase.pipe';
import { UpcomingBookingsViewComponent } from './components/upcoming-bookings-view/upcoming-bookings-view.component';
import { CompletedBookingsViewComponent } from './components/completed-bookings-view/completed-bookings-view.component';
import { AllBookingsViewComponent } from './components/all-bookings-view/all-bookings-view.component';
import { PluralityPipe } from './pipes/plurality/plurality.pipe';
import { QuickViewMovieComponent } from './components/quick-view-movie/quick-view-movie.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';

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
    TheaterListComponent,
    LeadingZerosPipe,
    ClockFormat12Pipe,
    ClockFormat24Pipe,
    MinutesToHHMMPipe,
    DashboardComponent,
    ProfileComponent,
    SeatSelectionComponent,
    TestComponent,
    BookingViewComponent,
    FallproofImageComponent,
    SuperAdminMoviesComponent,
    SuperAdminTheatersComponent,
    SuperAdminUsersComponent,
    SuperAdminAdminsComponent,
    SuperAdminHomeComponent,
    LoaderButtonComponent,
    ForgotPasswordComponent,
    ReleaseDatePhrasePipe,
    UpcomingBookingsViewComponent,
    CompletedBookingsViewComponent,
    AllBookingsViewComponent,
    PluralityPipe,
    QuickViewMovieComponent,
    MovieDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ImageCropperModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
