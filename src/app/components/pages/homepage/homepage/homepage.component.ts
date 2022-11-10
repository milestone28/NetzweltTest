import { Component, ElementRef, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { ParentData } from 'src/app/models/responses/Iterritories-tree-response';

import { TerritoriesService } from 'src/app/_services/territories.service';
declare const myFunctionJS: any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  //utitlites
  data: Array<any>;
  parentList: Array<ParentData> = [];

  constructor(
    private _territoriesSerive: TerritoriesService,
    private _toastr: ToastrService,
    private elRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.getTerritories();
  }

  myFunction() {
    myFunctionJS();
  }

  getTerritories() {
    this._territoriesSerive
      .getTerritories()
      .pipe(first())
      .subscribe(
        (result) => {
          if (result.status === 200) {
            this.data = result.body.data;
           
            let parents = this.data.filter(x => x.parent == null);
            let child_id = [];
            let child_id2 = [];
       
            for (let i = 0; i < parents.length; i++) {
              let _myTreelist = new ParentData();
             _myTreelist.data.parent = parents[i].name;

             child_id = this.data.filter(x => x.parent == parents[i].id); //get child-1 with id
             _myTreelist.data.child.child1 = child_id.map((item) => {
                        return item.name
                      })


              for (let e = 0; e < child_id.length; e++) { //10 ids
              child_id2 = this.data.filter(a => a.parent === child_id[e].id); //get child-2 with id

             _myTreelist.data.child.child.child2 = child_id2.map((item) => {
                return item.name
              })
            
            }
             this.parentList.push(_myTreelist);
            }

            

            console.log(this.parentList);






            // parents.forEach(e => {

            //     // _myTreelist.data.parent.push(objParent);
            //     // _myTreelist.data.child.child1.push(objParent)
            //     // _myTreelist.data.child.child.child2.push(objParent)


            //     let child1 = this.data.filter(x => x.parent == e.id);



            //     // obj['id'] = e.name;
            //     // obj['child1'] = {};
            //     // obj['child1'].name1 = child1.map(e => e.name);
                
            //     // child1.forEach(c1 => {
            //     //     let child2 = this.data.filter(x => x.parent == c1.id);
            //     //     let c1temp = obj['child1'].name1.find(e => e == c1.name);
            //     //     console.log(c1temp);

            //     //     obj['child1'].name = c1.name;
            //     //     obj['child1']['child2'] = {};
            //     //     obj['child1'].child2.name2 = child2.map(e => e.name);
            //     // })
            
            //     // this.parentListTemp.push( { Description: obj } );
               
            // });
           
         
           

           










            // //filter parent
            // let _parents = [];
            // let _child1_1 = [];
            // let _child2_1 = [];
            // _parents = this.data.filter(x => x.parent === null);

            // for (let i = 0; i < _parents.length; i++) {

            //   _child1_1 = this.data.filter(x => x.parent === _parents[i].id);

            //   let newArrChild1 = _child1_1.map((item) => {
            //     let id;
            //     let name;
            //     let res = {
            //       id = item.name,
            //       name = item.name
            //     }
            //     return res
            //   })

            // let newArName = _child1_1.map((item) => {
            //   return item.name
            // })

            // //filter child 2
            // let newArId = _child1_1.map((item) => {
            //   return item.id
            // })

            // let tests;
            //   for (let i = 0; i < newArId.length; i++) {    //read all id in child 2
            //     _child2_1 = this.data.filter(x => x.parent === newArId[i]); //filter all id on data = to child2 id
            //         tests = _child2_1.map((item) => {
            //         return item.name
            //   })

            //           let _myTreelist = new ParentData();
            //     _myTreelist.description.child1.child2.name2 = tests;
            //     _myTreelist.description.name = _parents[i].name;
            //     _myTreelist.description.child1.name1 = newArName;

            //     this.parentList.push(_myTreelist);
            //       // }

            //   }

            //    //console.log(this.arrFilteredLastChildl[0]);
            //  console.log(this.parentList[0].description.child1.child2);
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
