import { projectsObserver } from './utils';
import { Project, ProjectStatus } from './types';

  // project state
  export class ProjectState {
    projects: Project[] = [];
    // private listeners: Listener[] = [];
    private static instance: ProjectState;

    private constructor() {}

    static getInstance() {
      if (this.instance) {
        return this.instance;
      }
      this.instance = new ProjectState();
      return this.instance;
    }

    // addListener(func: Listener) {
    //   this.listeners.push(func);
    // }

    moveProject(prjId: string, targetList: ProjectStatus) {
      const selectedPrj = this.projects.find((prj) => prjId === prj.id);
      if (selectedPrj && selectedPrj.projectStatus !== targetList) {
        selectedPrj.projectStatus = targetList;
        projectsObserver.dispatch(this.projects);
      }
    }

    addProject(projectData: Project) {
      this.projects.push(projectData);
      projectsObserver.dispatch(this.projects);
      // this.listeners.forEach((func) => func(this.projects));
    }
  }

