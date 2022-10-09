import { Attachable } from './../types';
  // Component Base
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateEl: HTMLTemplateElement;
  rootEl: T;
  element: U;

  constructor(tempId: string, rootId: string) {
    this.templateEl = document.getElementById(tempId)! as HTMLTemplateElement;
    this.rootEl = document.getElementById(rootId)! as T;
    this.element = document.importNode(this.templateEl.content, true)
      .firstElementChild! as U;
  }

  protected attach(attachPlace: Attachable) {
    this.rootEl.insertAdjacentElement(attachPlace, this.element);
  }

  abstract configure(): void;
  abstract renderContent(): void;
}
