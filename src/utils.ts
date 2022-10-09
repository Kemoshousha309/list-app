import { Listener } from './types';
  // ***********************************************************************************************
// PROJECT UTILITIES
class Observable<T extends Function> {
  subscribers: T[] = [];

  subscribe(fun: T) {
    this.subscribers.push(fun);
  }

  unsubscribe(fun: T) {
    this.subscribers = this.subscribers.filter(
      (subscriber) => subscriber !== fun
    );
  }

  dispatch(data: any) {
    this.subscribers.forEach((fun) => fun(data));
  }
}
export const projectsObserver = new Observable<Listener>();
 
