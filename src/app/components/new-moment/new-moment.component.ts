import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'
import { AppConstantService } from 'src/app/app-constant.service';



@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private router: Router,
    private httpClient: HttpClient,
    private appConstant: AppConstantService,
    private routeURL: ActivatedRoute) {
    console.log("constructor new moment")
    if (!window.sessionStorage.getItem('sesssionData')) {
      this.router.navigate(['/login'])
    }
  }

  momentForm: FormGroup
  sysdate: Date = new Date()
  uploadedImageFile: any
  formData: FormData = new FormData()
  momentID: any

  ngOnInit() {
    console.log("ngOnInit new moment")
    this.createForm()
    this.routeURL.queryParamMap.subscribe(params => {

      params = params['params']
      if (params['id']) {
        this.momentID = params['id']
        this.momentForm.patchValue({ _id: this.momentID })
      }
      console.log("momentID :", this.momentID)
    })
    this.onInitComponent()
  }

  createForm() {
    this.momentForm = this.fb.group({
      _id: new FormControl(),
      title: new FormControl(null, [Validators.required]),
      tags: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required]),
      createdBy: new FormControl(null, [Validators.required]),
      createdDate: new FormControl(this.sysdate, [Validators.required]),
    })
  }


  onInitComponent() {
    if (this.momentID) {
      this.httpClient.get(this.appConstant.SERVER_URL + '/getMomentById', { params: { id: this.momentID } }).subscribe(data => {
        console.log(data)
        if (data['code'] == 0) {
          console.log(data)
          this.momentForm.patchValue(data['data'])
        } else {
          Swal.fire("Error", "Something went wrong. Please contact to the administrator", 'error')
        }
      })
    }
  }

  onMomentList() {
    console.log("onMomentList")
    this.router.navigate(["/moment-list"])
  }

  onClickLogOut() {
    console.log("logout")
    window.sessionStorage.clear()
    this.router.navigate(["/login"])
  }

  onAddNewMoment() {
    console.log("onAddNewMoment")
    this.router.navigate(["/new-moment"])
  }

  uploadImage(event) {

    this.uploadedImageFile = event.target.files[0];
    console.log("File :", this.uploadedImageFile.type)
    if (this.uploadedImageFile.type.toString().includes('image')) {
      this.momentForm.patchValue({ image: this.uploadedImageFile.name })
    } else {
      Swal.fire("Warning", "Image only", 'warning').then(data => {
        this.momentForm.patchValue({ image: null })
      })
    }
  }

  onSubmit() {
    this.momentForm.patchValue({ createdBy: JSON.parse(window.sessionStorage.getItem('sesssionData'))['data']['_id'] })
    this.formData.append('title', this.momentForm.value.title)
    this.formData.append('tags', this.momentForm.value.tags)
    this.formData.append('createdBy', this.momentForm.value.createdBy)
    this.formData.append('createdDate', this.momentForm.value.createdDate)
    this.formData.append('image', this.uploadedImageFile)
    if (this.momentForm.valid) {
      this.httpClient.post(this.appConstant.SERVER_URL + '/addMoment', this.formData).subscribe(data => {
        console.log(data)
        if (data['code'] == 0) {
          Swal.fire("Success", data['message'], 'success').then(data => {
            this.formData = new FormData()
            this.router.navigate(['/moment-list'])
          })
        } else {
          this.formData = new FormData()
          Swal.fire("Error", data['message'], 'error')
        }
      })
    } else {
      this.formData = new FormData()
      Swal.fire("Warning", "All fields are mandatory", 'warning')
    }

  }

  onEdit() {
    this.momentForm.patchValue({ createdBy: JSON.parse(window.sessionStorage.getItem('sesssionData'))['data']['_id'] })
    this.formData.append('_id', this.momentForm.value._id)
    this.formData.append('title', this.momentForm.value.title)
    this.formData.append('tags', this.momentForm.value.tags)
    this.formData.append('createdBy', this.momentForm.value.createdBy)
    this.formData.append('createdDate', this.momentForm.value.createdDate)
    if (this.uploadedImageFile) {
      this.formData.append('image', this.uploadedImageFile)
    } else {
      this.formData.append('image', this.momentForm.value.image)
    }

    if (this.momentForm.valid) {
      this.httpClient.post(this.appConstant.SERVER_URL + '/updateMoment', this.formData).subscribe(data => {
        console.log(data)
        if (data['code'] == 0) {
          Swal.fire("Success", data['message'], 'success').then(data => {
            this.formData = new FormData()
            this.router.navigate(['/moment-list'])
          })
        } else {
          this.formData = new FormData()
          Swal.fire("Error", data['message'], 'error')
        }
      })
    } else {
      this.formData = new FormData()
      Swal.fire("Warning", "All fields are mandatory", 'warning')
    }
  }

  formDataDeleteAll(formdataObj: FormData) {
    formdataObj.delete('title')
    formdataObj.delete('tags')
    formdataObj.delete('createdBy')
    formdataObj.delete('createdDate')
    formdataObj.delete('image')
    return formdataObj

  }

}
