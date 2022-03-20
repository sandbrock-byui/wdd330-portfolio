export default class DependencyInjectionService {
  services = {};

  get(name) {
    if (!this.services.hasOwnProperty(name)) {
      throw new Error('Unable to locate DI service ' + name);
    }
    return this.services[name];
  }

  register(name, service) {
    this.services[name] = service;
  }
}