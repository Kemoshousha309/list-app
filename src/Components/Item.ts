import { Project } from './../types';
import { Draggable } from "../types";
import { Component } from "./Base";
import { AutoBind } from '../decorators';

// project item
export class ProjectItem
extends Component<HTMLUListElement, HTMLLIElement>
implements Draggable
{
private persons: string = "";
get getPersons() {
  if (this.prj.people > 1) {
    this.persons = this.prj.people + " persons";
    return this.persons;
  }
  this.persons = this.prj.people + " person";
  return this.persons;
}
constructor(private prj: Project, listId: string) {
  super("single-project", listId);
  this.attach("beforeend")
  this.renderContent();
  this.configure();
}
@AutoBind
dragStartHandler(event: DragEvent): void {
  event.dataTransfer!.setData("text/plain", this.prj.id)
  event.dataTransfer!.effectAllowed = "move";
}
@AutoBind
dragEndHandler(event: DragEvent): void {
  // console.log("drag end");
}
configure(): void {
  this.element.addEventListener("dragstart", this.dragStartHandler);
  this.element.addEventListener("dragend", this.dragEndHandler);
}
renderContent(): void {
  this.element.querySelector("h2")!.innerText = this.prj.title;
  this.element.querySelector("h3")!.innerText = this.getPersons + " assigned";
  this.element.querySelector("p")!.innerText = this.prj.description;
}
}


