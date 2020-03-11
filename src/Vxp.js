import VxpPlugin from "./VxpPlugin";

class Vxp {
  constructor(viewAdapter) {
    if (!viewAdapter) {
      throw new Error("请提供视图适配器：VueAdapter 或者 ReactAdapter !!!");
    }
    this.v = viewAdapter;
  }
  render(el) {
    this.v.render(el);
    return this;
  }
  use(plugin) {
    if (Array.isArray(plugin)) {
      plugin.forEach(_plugin => this.use(_plugin));
      return this;
    }
    if (plugin.used) {
      return this;
    }
    if (plugin instanceof VxpPlugin) {
      plugin.apply(this);
    } else if (typeof plugin === 'function') {
      plugin(this);
    } else {
      throw new Error("Invalid argument: plugin");
    }
    plugin.used = true;
    return this;
  }
}

export default Vxp;
