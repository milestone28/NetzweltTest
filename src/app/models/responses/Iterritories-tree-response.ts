

export class ParentData implements Child1{
    data = {
        parent: [],
        child : {
          child1: [],
          child : {
              child2 : []
            }
        }
        
        
        
        
        
        
        
        
        
        //title
        // child1: {
        //   // name1: [], // hundreds
        //   // child2: {
        //   //   name2: [] //thoudsands
        //   // }
        // },
      }
}

export interface Child1 {
    data: {
      parent: string[],
      child : {
        child1: string[];
        child : {
          child2: string[];
        }
      }





        // child1: {
        //     id: string;
        //     name: string
        //   // name1: string[];
        //   // child2: {
        //   //   name2: Array<string>;
        //   // }
        // }
        
      }
}
