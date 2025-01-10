import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie/movie.service';
import { TheaterService } from 'src/app/services/theater/theater.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent {

  totalMovies = 0;
  totalTheaters = 0;
  totalAdmins = 0;
  totalUsers = 0;

  constructor(
    private movieService: MovieService,
    private theaterService: TheaterService,
    private userService: UserService,
    private router: Router) {
    this.fetchMovieCount();
    this.fetchTheaterCount();
    this.fetchAdminCount();
    this.fetchUserCount();
  }

  fetchMovieCount() {
    this.movieService.getMoviesCount().subscribe({
      next: (response) => this.totalMovies = response,
      error: (error) => { }
    });
  }

  fetchTheaterCount() {
    this.theaterService.getTheaterCount().subscribe({
      next: (response) => this.totalTheaters = response,
      error: (error) => { }
    });
  }

  fetchAdminCount() {
    this.userService.getTheaterAdminCount().subscribe({
      next: (response) => this.totalAdmins = response,
      error: (error) => { }
    });
  }

  fetchUserCount() {
    this.userService.getUserCount().subscribe({
      next: (response) => this.totalUsers = response,
      error: (error) => { }
    });
  }

  navigate(path: string) {
    path = "/dashboard/super-admin/" + path;
    this.router.navigate([ path]);
  }

}
