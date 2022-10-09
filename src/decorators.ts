
  // auto bind decorator
  export function AutoBind(
    prototype: object,
    name: string,
    descriptor: PropertyDescriptor
  ) {
    // method decorator
    const oldMethod = descriptor.value;
    const newMethod = {
      configurable: true,
      enumerable: true,
      get() {
        // this logic would be executed when ever the method that is stored in the value
        // is called and this would enable us to add extra logic layer before the call of the method
        return oldMethod.bind(this);
      },
    };
    return newMethod;
  }

