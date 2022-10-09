import { prjState } from './../app';
import { Project, Validatable } from './../types';
import { AutoBind } from "../decorators";
import { Component } from "./Base";
import { validate } from '../validation';


  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInput: HTMLInputElement;
    descInput: HTMLInputElement;
    peopleInput: HTMLInputElement;

    constructor() {
      super("project-input", "app");
      this.attach("beforeend");

      // access the inputs
      this.titleInput = document.getElementById("title")! as HTMLInputElement;
      this.descInput = document.getElementById(
        "description"
      )! as HTMLInputElement;
      this.peopleInput = document.getElementById("people")! as HTMLInputElement;

      this.setListener();
    }

    @AutoBind
    private ListenerHandler(event: Event) {
      event.preventDefault();
      const title = this.titleInput.value;
      const description = this.descInput.value;
      const people = +this.peopleInput.value;
      // validation
      const [valid, mess] = this.getValidation(title, description, people);
      if (!valid) {
        alert(mess);
        return;
      }
      const newProject = new Project(
        Math.random().toString(),
        title,
        description,
        people,
        "active"
      );
      prjState.addProject(newProject);
      this.clearInputs();
    }

    configure(): void {}
    renderContent(): void {}

    getValidation(
      title: string,
      description: string,
      people: number
    ): [boolean, string] {
      // prepare config objs
      const titleConfig: Validatable = {
        name: "title",
        value: title,
        required: true,
      };
      const descConfig: Validatable = {
        name: "description",
        value: description,
        required: true,
        maxLength: 20,
        minLength: 5,
      };
      const peopleConfig: Validatable = {
        name: "people",
        value: people,
        required: true,
        max: 20,
        min: 0,
      };

      const validationResults = [
        validate(titleConfig),
        validate(descConfig),
        validate(peopleConfig),
      ];

      let isFormValid = true;
      let formErrorMess = "";
      for (const result of validationResults) {
        const [isValid, mess] = result;
        isFormValid = isFormValid && isValid;
        if (!isValid) {
          formErrorMess += `\n${mess}`;
        }
      }
      return [isFormValid, formErrorMess];
    }

    private clearInputs() {
      this.titleInput.value = "";
      this.descInput.value = "";
      this.peopleInput.value = "";
    }

    private setListener() {
      this.element.addEventListener("submit", this.ListenerHandler);
    }
  }

