import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/signup/signup.component';
import { UserComponent } from './components/user/user.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CompletedBookingsComponent } from './components/completed-bookings/completed-bookings.component';
import { UpcomingBookingsComponent } from './components/upcoming-bookings/upcoming-bookings.component';
import { AllBookingsComponent } from './components/all-bookings/all-bookings.component';
import { NewBookingComponent } from './components/new-booking/new-booking.component';
import { AllMoviesComponent } from './components/all-movies/all-movies.component';
import { TheaterAdminComponent } from './components/theater-admin/theater-admin.component';
import { SuperAdminComponent } from './components/super-admin/super-admin.component';
import { TheaterActionsComponent } from './components/theater-actions/theater-actions.component';
import { MovieBookingComponent } from './components/movie-booking/movie-booking.component';
import { MovieMarketplaceComponent } from './components/movie-marketplace/movie-marketplace.component';
import { ShowComponent } from './components/show/show.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TheaterListComponent } from './components/theater-list/theater-list.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  {
    path: "dashboard", component: DashboardComponent, children: [
      { path: 'super-admin', component: SuperAdminComponent },
      {
        path: 'theater-admin', component: TheaterAdminComponent, children: [
          { path: "theater/:theaterId", component: TheaterActionsComponent },
          { path: "theater-show/:theaterId", component: ShowComponent },
          { path: "movie-marketplace/:theaterId", component: MovieMarketplaceComponent },
          { path: "", pathMatch: 'full', component: TheaterListComponent }
        ]
      },
      { path: "user", component: UserComponent }
    ]
  },
  { path: "movie/:movieId", component: MovieBookingComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignUpComponent },
  { path: "", redirectTo: "home", pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
