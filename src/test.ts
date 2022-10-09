import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import {
  validate,
  validateOrReject,
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max,
} from 'class-validator';

// using a 3d party vanilla js with @types can be possible in typescript
import _ from "lodash"; // loading 3d part lib

// using vanilla js package "lodash"

const shuffle = _.shuffle([2, 3, 5, 8, 1, 6])

// using class transformer "ts"
// a lib build in ts and has no ts api
class Node {
  constructor(private name: string, private id: number) {}
  render() {
    console.log(`${this.name} node is rendered`);
    
  }
}



export const nodes  = [
  {name: "div", id: 2},
  {name: "h2", id: 4},
  {name: "p", id: 5},
]

console.log(nodes);


export const constructedNodes: Node[] = plainToInstance(Node, nodes); 
// for(const node of nodes) {
//   constructedNodes.push(new Node(node.name, node.id));
// }
console.log(constructedNodes);


// using class Validator 
// a lib build in ts and uses ts api (decorators)
export class Post {
  @Length(10, 20) 
  title!: string;

  @Contains('hello')
  text!: string;

  @IsInt()
  @Min(0)
  @Max(10)
  rating!: number;

  @IsEmail()
  email!: string;

  @IsFQDN()
  site!: string;

  @IsDate()
  createDate!: Date; 
  // constructor(t: string, text: string, r: number, em: string, site: string, createDate: Date){
  //   this.title = t;
  //   this.text = text;
  //   this.rating = r;
  //   this.email = em;
  //   this.site = site;
  //   this.createDate = createDate;
  // }
}

let post = new Post();
post.title = 'Hello'; // should not pass
post.text = 'this is a great post about hell world'; // should not pass
post.rating = 11; // should not pass
post.email = 'google.com'; // should not pass
post.site = 'googlecom'; // should not pass

validate(post).then(errors => {
  // errors is an array of validation errors
  if (errors.length > 0) {
    console.log('validation failed. errors: ', errors);
  } else {
    console.log('validation succeed');
  }
});
