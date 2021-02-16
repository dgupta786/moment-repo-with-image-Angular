import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'
import { AppConstantService } from 'src/app/app-constant.service';


@Component({
  selector: 'app-moment-list',
  templateUrl: './moment-list.component.html',
  styleUrls: ['./moment-list.component.css']
})
export class MomentListComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private router: Router,
    private httpClient: HttpClient,
    private appConstant: AppConstantService,
    private routeURL: ActivatedRoute) {
    console.log("constructor moment list")
    if (!window.sessionStorage.getItem('sesssionData')) {
      this.router.navigate(['/login'])
    }
  }


  momentList: any
  currentUser: any = JSON.parse(window.sessionStorage.getItem('sesssionData'))['data']['_id']
  ngOnInit() {
    console.log("ngOnInit moment list")
    this.initTableData()
  }

  initTableData() {
    this.httpClient.get(this.appConstant.SERVER_URL + '/getMomentByUser', { params: { id: this.currentUser } }).subscribe(data => {
      console.log(data)
      if (data['code'] == 0) {
        console.log(data)
        this.momentList = data['data']
      } else {
        Swal.fire("Error", "Something went wrong. Please contact to the administrator", 'error')
      }
    })
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


  loadImage(image) {
    return this.appConstant.IMAGE_URL + image
  }

  onDeleteMoment(id) {
    console.log(id)
    this.httpClient.get(this.appConstant.SERVER_URL + '/deleteMoment', { params: { id: id } }).subscribe(data => {
      console.log(data)
      if (data['code'] == 0) {
        console.log(data)
        Swal.fire("Success", data['message'], 'success').then(swalData => {
          this.initTableData()
        })
      } else {
        Swal.fire("Error", "Something went wrong. Please contact to the administrator", 'error')
      }
    })

  }
}
