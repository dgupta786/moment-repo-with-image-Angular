import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'
import { AppConstantService } from 'src/app/app-constant.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpClient: HttpClient,
    private appConstant: AppConstantService,
    private routeURL: ActivatedRoute) {
    window.sessionStorage.clear()
  }

  userForm: FormGroup

  ngOnInit() {
    this.createForm()
  }

  createForm() {
    this.userForm = this.fb.group({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    })
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.httpClient.post(this.appConstant.SERVER_URL + '/login', this.userForm.value).subscribe(data => {
        console.log(data)
        if (data['code'] == 0) {
          window.sessionStorage.setItem('sesssionData', JSON.stringify(data));
          this.router.navigate(["/moment-list"])
        } else {
          Swal.fire("Error", data['message'], 'error')
        }
      })
    } else {
      Swal.fire("Warning", "All fields are mandatory", 'warning')
    }

  }

}
