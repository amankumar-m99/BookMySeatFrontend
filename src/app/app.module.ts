import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UpcomingBookingsComponent } from './components/upcoming-bookings/upcoming-bookings.component';
import { CompletedBookingsComponent } from './components/completed-bookings/completed-bookings.component';
import { AllBookingsComponent } from './components/all-bookings/all-bookings.component';
import { NewBookingComponent } from './components/new-booking/new-booking.component';
import { AllTheatresComponent } from './components/all-theatres/all-theatres.component';
import { AllMoviesComponent } from './components/all-movies/all-movies.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    RegisterComponent,
    UserComponent,
    PageNotFoundComponent,
    UpcomingBookingsComponent,
    CompletedBookingsComponent,
    AllBookingsComponent,
    NewBookingComponent,
    AllTheatresComponent,
    AllMoviesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
