import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/signup/signup.component';
import { UserComponent } from './components/user/user.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TheaterAdminComponent } from './components/theater-admin/theater-admin.component';
import { SuperAdminComponent } from './components/super-admin/super-admin.component';
import { MovieBookingComponent } from './components/movie-booking/movie-booking.component';
import { MovieMarketplaceComponent } from './components/movie-marketplace/movie-marketplace.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TheaterListComponent } from './components/theater/theater-list/theater-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SeatSelectionComponent } from './components/seat-selection/seat-selection.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { LoginGuard } from './guards/login/login.guard';
import { TestComponent } from './components/test/test.component';
import { SuperAdminMoviesComponent } from './components/super-admin-movies/super-admin-movies.component';
import { SuperAdminHomeComponent } from './components/super-admin-home/super-admin-home.component';
import { SuperAdminTheatersComponent } from './components/super-admin-theaters/super-admin-theaters.component';
import { SuperAdminAdminsComponent } from './components/super-admin-admins/super-admin-admins.component';
import { SuperAdminUsersComponent } from './components/super-admin-users/super-admin-users.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { TheaterDetailsComponent } from './components/theater/theater-details/theater-details.component';

const routes: Routes = [
  { path: "home", component: HomeComponent, canActivate: [LoginGuard] },
  {
    path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard], children: [
      {
        path: 'super-admin', component: SuperAdminComponent, children: [
          { path: 'movies', component: SuperAdminMoviesComponent },
          { path: 'movie/:movieId', component: MovieDetailsComponent },
          { path: 'theaters', component: SuperAdminTheatersComponent },
          { path: 'theater/:theaterId', component: TheaterDetailsComponent },
          { path: 'admins', component: SuperAdminAdminsComponent },
          { path: 'users', component: SuperAdminUsersComponent },
          { path: '', pathMatch: 'full', component: SuperAdminHomeComponent }
        ]
      },
      {
        path: 'theater-admin', component: TheaterAdminComponent, children: [
          { path: "", pathMatch: 'full', component: TheaterListComponent },
          { path: "theater/:theaterId", component: TheaterDetailsComponent },
          { path: "movie-marketplace/:theaterId", component: MovieMarketplaceComponent },
        ]
      },
      { path: "user", component: UserComponent },
      { path: "profile", component: ProfileComponent },
      { path: "movie/:movieId", component: MovieBookingComponent },
      { path: "seat-selection/:theaterId/:showtimeId", component: SeatSelectionComponent },
    ]
  },
  { path: "login", component: LoginComponent, canActivate: [LoginGuard] },
  { path: "signup", component: SignUpComponent, canActivate: [LoginGuard] },
  { path: "forgot-password", component: ForgotPasswordComponent, canActivate: [LoginGuard] },
  { path: "forgot-password/:username", component: ForgotPasswordComponent, canActivate: [LoginGuard] },
  { path: "test", component: TestComponent },
  { path: "", redirectTo: "home", pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
