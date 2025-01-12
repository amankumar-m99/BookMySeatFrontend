import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Theater } from 'src/app/model/theater.model';
import { EncryptionService } from 'src/app/services/encryption/encryption.service';
import { TheaterService } from 'src/app/services/theater/theater.service';

@Component({
  selector: 'app-super-admin-theaters',
  templateUrl: './super-admin-theaters.component.html',
  styleUrls: ['./super-admin-theaters.component.css']
})
export class SuperAdminTheatersComponent {
  theaters?: Theater[];

  constructor(
    private theaterService: TheaterService,
    private toastr: ToastrService,
    private encryption: EncryptionService
  ) {
    this.fetchTheaters();
  }

  fetchTheaters() {
    this.theaterService.getAllTheaters().subscribe({
      next: (response) => this.theaters = response,
      error: (error) => this.toastr.error("Error", error.message)
    })
  }

  encryptedId(id: number): string {
    return this.encryption.encrypt(String(id));
  }
}
