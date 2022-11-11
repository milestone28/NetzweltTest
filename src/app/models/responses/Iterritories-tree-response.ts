// export class ParentData implements Child1 {
//   data = {
//     parent: '',
//     child: {
//       child1: [],
//       child: {
//         child2: [],
//       },
//     },
//   };
// }

// export interface Child1 {
//   data: {
//     parent: string;
//     child: {
//       child1: string[];
//       child: {
//         child2: string[];
//       };
//     };
//   };
// }




export class TerritoryResponse {
  public id: string;
  public name: string;
  public parent: string | null;
}