import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { TerritoriesService } from 'src/app/_services/territories.service';
declare const myFunctionJS: any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  //utitlites
  data: Array<any>;


  constructor(private _territoriesSerive : TerritoriesService, private _toastr : ToastrService) { }

  ngOnInit(): void {
    this.getTerritories();
    myFunctionJS();
  }









  getTerritories(){
    this._territoriesSerive
    .getTerritories()
    .pipe(first())
    .subscribe(
      (result) => {
     
         if (result.status === 200) {
          this.data = result.body.data
          console.log(this.data);
         } else {
          this._toastr.error('Something went very very wrong.');
         }
      },
      (error) => {
        console.log(error);
      },
      () => {
      }
    );
}
  

}
