import { nodes } from './test';
import { ProjectList } from './Components/LIst';
import { ProjectInput } from './Components/Input';
import { ProjectState } from "./state";

const my = nodes;

export const prjState = ProjectState.getInstance();
export const prjInput = new ProjectInput();
export const activePrjList = new ProjectList("active");
export const finishedPrjList = new ProjectList("finished");
