export class Config {

  configurations = {
    range: 3,
    limit: 30,
  }

  configure(configs) {
    Object.assign(this.configurations, configs);
    return this;
  }

}
