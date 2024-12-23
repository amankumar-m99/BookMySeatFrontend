import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Theater } from 'src/app/model/theater.model';
import { TheaterService } from 'src/app/services/theater/theater.service';

@Component({
  selector: 'app-theater-actions',
  templateUrl: './theater-actions.component.html',
  styleUrls: ['./theater-actions.component.css']
})
export class TheaterActionsComponent {

  theaterId: number;
  theater?:Theater;

  constructor(
    private theaterService: TheaterService,
    private router: Router,
    private activatedroute: ActivatedRoute
  ) {
    this.theaterId = 0;
    if (this.activatedroute.snapshot.paramMap?.has("theaterId")) {
      this.theaterId = Number(this.activatedroute.snapshot.paramMap.get("theaterId"));
      this.fetchData();
    }
  }

  fetchData():void{
    this.theaterService.getTheaterById(this.theaterId).subscribe({
      next: (response) => {
        this.theater = response;
      },
      error: (error) => {},
      complete: () => {}
    });
  }

}
