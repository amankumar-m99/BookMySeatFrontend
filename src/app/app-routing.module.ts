import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/signup/signup.component';
import { UserComponent } from './components/user/user.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CompletedBookingsComponent } from './components/completed-bookings/completed-bookings.component';
import { UpcomingBookingsComponent } from './components/upcoming-bookings/upcoming-bookings.component';
import { AllBookingsComponent } from './components/all-bookings/all-bookings.component';
import { NewBookingComponent } from './components/new-booking/new-booking.component';
import { AllTheatresComponent } from './components/all-theatres/all-theatres.component';
import { AllMoviesComponent } from './components/all-movies/all-movies.component';
import { TheaterAdminComponent } from './components/theater-admin/theater-admin.component';
import { SuperAdminComponent } from './components/super-admin/super-admin.component';
import { TheaterActionsComponent } from './components/theater-actions/theater-actions.component';
import { MovieBookingComponent } from './components/movie-booking/movie-booking.component';
import { MovieMarketplaceComponent } from './components/movie-marketplace/movie-marketplace.component';

const routes: Routes = [
  { path: "home", redirectTo: "" },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignUpComponent },
  {
    path: "admin", component: AdminComponent, children: [
      { path: "all-theatres", component: AllTheatresComponent },
      { path: "all-movies", component: AllMoviesComponent }
    ]
  },
  { path: "super-admin", component: SuperAdminComponent },
  { path: "theater-admin", component: TheaterAdminComponent },
  { path: "movie-marketplace/:theaterId", component: MovieMarketplaceComponent },
  { path: "theater/:theaterId", component: TheaterActionsComponent },
  {
    path: "user", component: UserComponent, children: [
      { path: "", redirectTo: "upcoming-bookings", pathMatch: "full" },
      { path: "upcoming-bookings", component: UpcomingBookingsComponent },
      { path: "completed-bookings", component: CompletedBookingsComponent },
      { path: "all-bookings", component: AllBookingsComponent },
      {
        path: "new-booking", component: NewBookingComponent, children: [
          { path: "movie/:movieId", component: MovieBookingComponent },
          { path: "", component: AllMoviesComponent }
        ]
      },
    ]
  },
  { path: "", component: HomeComponent, pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
