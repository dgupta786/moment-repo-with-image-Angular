import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'
import { AppConstantService } from 'src/app/app-constant.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private router: Router,
    private httpClient: HttpClient,
    private appConstant: AppConstantService,
    private routeURL: ActivatedRoute) {
    window.sessionStorage.clear()
  }


  userForm: FormGroup
  sysDate: Date = new Date()

  ngOnInit() {
    this.httpClient.get(this.appConstant.SERVER_URL + '/users').subscribe(data => {
      console.log(data)
    })
    this.createForm()
  }


  createForm() {
    this.userForm = this.fb.group({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      mobile: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      createdDate: new FormControl(this.sysDate, [Validators.required]),
    })
  }

  onSave() {
    if (this.userForm.valid) {
      this.httpClient.post(this.appConstant.SERVER_URL + '/addUser', this.userForm.value).subscribe(data => {
        console.log(data)
        if (data['code'] == 0) {
          Swal.fire("Success", data['message'], 'success').then(data => {
            this.router.navigate(['/login'])
          })
        } else {
          Swal.fire("Error", data['message'], 'error')
        }
      })
    } else {
      Swal.fire("Warning", "All fields are mandatory", 'warning')
    }

  }

}
