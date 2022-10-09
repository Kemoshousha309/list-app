import { DragTarget, Project, ProjectStatus } from './../types';
import { projectsObserver } from './../utils';
import { ProjectItem } from './Item';
import { AutoBind } from '../decorators';
import { prjState } from './../app';
import { Component } from './Base';

  // project list
  export class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget
  {
    header: HTMLHeadElement;
    list: HTMLElement;
    registeredProjects: Project[] = [];
    constructor(private type: ProjectStatus) {
      super("project-list", "app");
      this.attach("beforeend");
      this.element.id = `${type}-projects`;

      this.header = this.element.querySelector("h2")! as HTMLHeadElement;
      this.list = this.element.querySelector("ul")! as HTMLUListElement;
      this.list.id = `${type}-projects-view-list`;

      projectsObserver.subscribe((projects: Project[]) => {
        this.registeredProjects = projects.filter(
          (prj) => prj.projectStatus === type
        );
        this.renderContent();
      });

      this.fillContent();
      this.configure();
    }

    renderContent(): void {
      // render the registered projects into the screen
      this.list.innerHTML = "";
      this.registeredProjects.forEach((prj) => {
        return new ProjectItem(prj, this.list.id);
      });
    }

    @AutoBind
    dragOverHandler(event: DragEvent): void {
      if (event.dataTransfer!.types[0] === "text/plain") {
        event.preventDefault();
        this.list.classList.add("droppable");
      }
    }
    @AutoBind
    dragLeaveHandler(event: DragEvent): void {
      event.preventDefault();
      this.list.classList.remove("droppable");
    }
    @AutoBind
    dropHandler(event: DragEvent): void {
      event.preventDefault();
      const selectedPrjId = event.dataTransfer?.getData("text/plain");
      this.list.classList.remove("droppable");
      if (selectedPrjId) prjState.moveProject(selectedPrjId, this.type);
    }
    configure(): void {
      this.element.addEventListener("dragover", this.dragOverHandler);
      this.element.addEventListener("dragleave", this.dragLeaveHandler);
      this.element.addEventListener("drop", this.dropHandler);
    }
    private fillContent() {
      this.header.innerText = `${this.type.toUpperCase()} PROJECTS`;
    }
  }

