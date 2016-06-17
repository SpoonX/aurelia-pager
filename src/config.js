export class Config {

  configurations = {}

  configure(configs) {
    Object.assign(this.configurations, configs);
    return this;
  }

}
