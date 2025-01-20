import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppData } from 'src/app/data/app.data';
import { TheaterFormModel } from 'src/app/model/theater-form.model';
import { Theater } from 'src/app/model/theater.model';
import { TheaterService } from 'src/app/services/theater/theater.service';

@Component({
  selector: 'app-theater-admin',
  templateUrl: './theater-admin.component.html',
  styleUrls: ['./theater-admin.component.css']
})
export class TheaterAdminComponent implements OnInit {

  theaters: Theater[];
  userId: number;
  theaterForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private theaterService: TheaterService,
    private toastr: ToastrService
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
    if (AppData.isLoggedIn()) {
      this.userId = Number(localStorage.getItem("userId"))
      this.fetchTheaters();
    }
  }

  fetchTheaters(): void {
    this.theaterService.getAllTheatersOfOwner(this.userId).subscribe({
      next: (response) => this.theaters = response,
      error: (error) => this.toastr.error("Error", "Couldn't get all theaters"),
      complete: () => { }
    });
  }

  submit(): void {
    let name: string = this.theaterForm.get("name")?.value;
    let location: string = this.theaterForm.get("location")?.value;
    let phoneNumber: string = this.theaterForm.get("phoneNumber")?.value;
    if (this.theaterForm.invalid) {
      this.toastr.error("Fill all fields", "Invalid form");
      return;
    }
    let signUpFormModel: TheaterFormModel = new TheaterFormModel(this.userId, name, location, phoneNumber);
    this.theaterService.registerTheater(signUpFormModel).subscribe({
      next: (response) => this.fetchTheaters(),
      error: (error) => this.toastr.error(error.message, 'Error ' + error.status),
      complete: () => { }
    });
  }
}
