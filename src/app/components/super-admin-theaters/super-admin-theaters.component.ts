import { Component } from '@angular/core';
import { Theater } from 'src/app/model/theater.model';
import { TheaterService } from 'src/app/services/theater/theater.service';

@Component({
  selector: 'app-super-admin-theaters',
  templateUrl: './super-admin-theaters.component.html',
  styleUrls: ['./super-admin-theaters.component.css']
})
export class SuperAdminTheatersComponent {
  theaters?: Theater[];

  constructor(private theaterService: TheaterService) {
      this.fetchTheaters();
    }
  
    fetchTheaters() {
      this.theaterService.getAllTheaters().subscribe({
        next: (response) => {
          this.theaters = response;
        },
        error: (error) => {
          alert("Error " + error.status + ", " + error.message);
        }
      })
    }
}
