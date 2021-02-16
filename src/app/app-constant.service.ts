import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConstantService {
  private server_string = "http://localhost:8000"
  public SERVER_URL = this.server_string
  public IMAGE_URL = this.server_string + "/downloadImage?id="

  constructor() { }
}
