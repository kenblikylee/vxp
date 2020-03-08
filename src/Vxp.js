class Vxp {
  constructor(options, viewAdapter) {
    if (!viewAdapter) {
      console.error("请提供视图适配器：vue 或者 react。");
      return;
    }
    this._v = viewAdapter;
    this._options = options;
    this._init();
  }
  _init() {
    if (this.options.plugins) this.use(this.options.plugins);
    if (this.options.el) this._v.render(el);
  }
  use(plugin) {
    if (Array.isArray(plugin)) {
      plugin.forEach(_plugin => this.use(_plugin));
      return
    }
    if (plugin.used) {
      return
    }
    if (typeof plugin === 'function') {
      plugin(this);
    } else if (typeof plugin === 'object') {
      plugin.apply(this);
    } else {
      throw new Error("Invalid argument: plugin");
    }
    plugin.used = true;
  }
}

export default Vxp;
