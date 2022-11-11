import { Component, ElementRef, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { Territory } from 'src/app/models/db/territories/territories';
import { TerritoryResponse } from 'src/app/models/responses/Iterritories-tree-response';

import { TerritoriesService } from 'src/app/_services/territories.service';
declare const myFunctionJS: any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {

  //utitlites
  data: Array<TerritoryResponse>;
  territories: Territory[] = [];

  constructor(
    private _territoriesSerive: TerritoriesService,
    private _toastr: ToastrService,
    private _router : Router
  ) {}

  ngOnInit(): void {
    this.getTerritories();
  }

  myFunction() {
    myFunctionJS();
  }

    logout() {
      localStorage.removeItem('currentUser');
      this._router.navigate(['login']);
      location.reload();
    }
  

  getTerritories() {
    this._territoriesSerive
      .getTerritories()
      .pipe(first())
      .subscribe(
        (result) => {
          if (result.status === 200) {

            this.data = result.body.data;
       
            // root data
            this.territories = this.data.filter((territory) => territory.parent === null);

            // children
            this.territories.forEach((rootTerritory) => {
              this.data.forEach((territory) => {
                if (territory.parent !== null) {
                  if (rootTerritory.id === territory.parent) {

                    // find childen
                    let children = this.data.filter(
                      (childrenTerritory) =>
                        childrenTerritory.parent === territory.id
                    );

                    if (!rootTerritory.children) 
                      rootTerritory.children = [];

                    rootTerritory.children.push({
                      id: territory.id,
                      name: territory.name,
                      parent: territory.parent,
                      children,
                    });
                  }
                }
              });
              
            });

            console.log(this.territories);
           

          } else {
            this._toastr.error('Something went very very wrong.');
          }
        },
        (error) => {
          console.log(error);
        },
        () => {}
      );
  }
}
