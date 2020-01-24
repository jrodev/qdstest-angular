
import { Component } from '@angular/core';
import { ApiService } from "./service/api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'qdstest-angular';

  constructor(
    public restApi: ApiService
  ) { }

  ngOnInit() {
    //this.loadTestArreglo()
  }

  // Get employees list
  loadTestArreglo() {
    return this.restApi.getTestArreglo().subscribe((data: {}) => {
      console.log("data:",data);
    })
  }

}
