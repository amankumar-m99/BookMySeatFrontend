import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Movie } from 'src/app/model/movie.model';
import { EncryptionService } from 'src/app/services/encryption/encryption.service';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movieId = 0;
  movie: Movie = new Movie(0, "", "", "", 0, "", 0, "", new Date(), []);;

  constructor(
    private router: Router,
    private encryption: EncryptionService,
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.movieId = Number(this.encryption.decryptRouteParam(this.activatedRoute, "movieId"));
      if (this.movieId > 0) {
        this.fetchData();
      }
    });
  }

  fetchData(): void {
    this.movieService.getMovieById(this.movieId).subscribe({
      next: (respnse) => this.movie = respnse,
      error: (error) => this.toastr.error("Couldn't fetch movie", "Error " + error.status)
    })
  }

  encryptId(id: number): string {
    return this.encryption.encrypt(String(id));
  }

  navigatePrevMovie(): void {
    if (this.movieId == 0) {
      return;
    }
    this.router.navigate(['../../movie-details', this.encryptId(this.movieId - 1)], { relativeTo: this.activatedRoute });
  }

  navigateNextMovie(): void {
    this.router.navigate(['../../movie-details', this.encryptId(this.movieId + 1)], { relativeTo: this.activatedRoute });
  }

}
