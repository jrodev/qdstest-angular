
import { Component } from '@angular/core';
import { ApiService } from "./service/api.service";
import {Arreglo} from "./models/arreglo"
import { last } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'qdstest-angular';

  lado: number = 2

  // Para saber si se desea rotar todo o no
  rotarTodo: boolean = false

  aArrayIn = []
  aArrayOut = []

  postArreglo:Arreglo

  constructor(
    public restApi: ApiService
  ) { 
    this.fillLados()

    console.log("this.aArrayIn:",this.aArrayIn);
  }

  fillLados (random:boolean = false, lado:number = 0) {

    this.lado = lado ? lado : this.lado
    let n:number = this.lado

    if( !(n>=2) ) { n = 2 }

    let contA:number = 0

    this.aArrayIn = []
    this.aArrayOut = []

    while (contA < n) {

      this.aArrayIn[contA] = []
      this.aArrayOut[contA] = []
      let contB:number = 0

      while (contB < n) {
        this.aArrayIn[contA][contB] = random ? (Math.floor(Math.random() * (99 - 1 + 1)) + 1) : 0
        this.aArrayOut[contA][contB] = 0
        contB++;
      }

      contA++; 
    }

  }

  ngOnInit() {
    this.loadTestArreglo()
  }

  changeFillLados ($event:any) {
    let lado:number = $event.target.value as number;
    this.fillLados(false, lado)
  }

  setArrayIn ($event:any, x:number, y:number) {
    if ($event.target.value != "") {
      let value:string = $event.target.value;
      this.aArrayIn[y][x] = parseInt(value)
      console.log("this.aArrayIn:",this.aArrayIn)
    }
  }

  // Get employees list
  loadTestArreglo() {
    return this.restApi.getTestArreglo().subscribe((data: {}) => {
      console.log("data:",data);
    })
  }

  // Probando nuestro api rest al load de la app
  postTestArreglo() {
    return this.restApi.getTestArreglo().subscribe((data: {}) => {
      console.log("data:",data);
    })
  }

  // Enviando nuestro arreglo al api para que lo rote
  postCreateArreglo () {

    this.postArreglo = new Arreglo
    this.postArreglo.id = this.rotarTodo ? 1 : 0
    this.postArreglo.input = this.aArrayIn
    this.postArreglo.output = []

    this.restApi.createNuevoArreglo(this.postArreglo).subscribe((data:any) => {
      console.log("data->", data)
      this.aArrayOut = data
    })
  }

}
