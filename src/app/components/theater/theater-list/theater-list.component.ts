import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TheaterFormModel } from 'src/app/model/theater-form.model';
import { Theater } from 'src/app/model/theater.model';
import { EncryptionService } from 'src/app/services/encryption/encryption.service';
import { TheaterService } from 'src/app/services/theater/theater.service';

@Component({
  selector: 'app-theater-list',
  templateUrl: './theater-list.component.html',
  styleUrls: ['./theater-list.component.css']
})

export class TheaterListComponent implements OnInit {

  theaters: Theater[];
  userId: number;
  theaterForm: FormGroup;

  @ViewChild("closeAddTheaterModal") closeAddTheaterModal !: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private theaterService: TheaterService,
    private toastr: ToastrService,
    private encryption: EncryptionService

  ) {
    this.theaters = [];
    this.userId = 0;
    this.theaterForm = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem("userId")) {
      this.userId = Number(localStorage.getItem("userId"));
      this.fetchTheaters();
    }
  }

  fetchTheaters(): void {
    this.theaterService.getAllTheatersOfOwner(this.userId).subscribe({
      next: (response) => this.theaters = response,
      error: (error) => this.toastr.error("Coludn't fetch teathers", 'Error ' + error.status),
      complete: () => { }
    });
  }

  submitAddTheaterForm(): void {
    if (this.theaterForm.invalid) {
      this.toastr.error("Fill all fields", "Invalid form");
      return;
    }
    let name: string = this.theaterForm.get("name")?.value;
    let location: string = this.theaterForm.get("location")?.value;
    let phoneNumber: string = this.theaterForm.get("phoneNumber")?.value;
    let signUpFormModel: TheaterFormModel = new TheaterFormModel(this.userId, name, location, phoneNumber);
    this.theaterService.registerTheater(signUpFormModel).subscribe({
      next: (response) => {
        this.theaters.push(response);
        this.closeAddTheaterModal.nativeElement.click();
        this.theaterForm.reset();
        this.toastr.success("Added a theater", "Success");
      },
      error: (error) => this.toastr.error(error.message, 'Error ' + error.status),
      complete: () => { }
    });
  }

  encryptedId(id: number): string {
    return this.encryption.encrypt(String(id));
  }
}
