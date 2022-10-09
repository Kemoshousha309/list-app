// PROJECT TYPES AND INTERFACES

  // the namespace is a space that can include any code entity [class, function, var, interface, ..]
  // any thing inside the namespace can be used locally "namespace local scope"
  // any property of the name space can be expose from the namespace by using "export"
  export type ProjectStatus = "active" | "finished";
  export type Attachable = "afterbegin" | "afterend" | "beforebegin" | "beforeend";

  export interface Validatable {
    name: string;
    value: string | number;
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    max?: number;
    min?: number;
  }

  export interface Listener {
    (projects: Project[]): void;
  }

  export class Project {
    constructor(
      public id: string,
      public title: string,
      public description: string,
      public people: number,
      public projectStatus: ProjectStatus
    ) {}
  }

  export interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
  }

  export interface DragTarget {
    dragOverHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
  }


