const N = ({ inData: c = [], inColumns: t = [], inConfig: o = {}, inTopN: e } = {}) => {
  const r = c, n = t, a = o, s = e;
  return {
    originalData: Array.isArray(r) ? typeof structuredClone == "function" ? structuredClone(r) : JSON.parse(JSON.stringify(r)) : [],
    columns: Array.isArray(n) ? n : [],
    config: a || {},
    topN: s
  };
}, j = ({ inColumnsCatalog: c = [], inColumnKeys: t = [] } = {}) => {
  const o = c, e = t;
  if (Array.isArray(e) && e.length > 0) {
    const r = new Map((Array.isArray(o) ? o : []).map((s) => [s.key, s])), n = [], a = [];
    for (const s of e) {
      const i = r.get(s);
      i ? a.push(i) : n.push(s);
    }
    return n.length > 0 && console.warn(
      `[json-to-dom-renderers] Warning: Config requested columns [${n.map((s) => `"${s}"`).join(", ")}] that do not exist in the columns catalog.`
    ), a;
  }
  return Array.isArray(o) ? o : [];
};
class I {
  constructor({ inData: t = [], inColumns: o = [], inConfig: e = {}, inTopN: r } = {}) {
    const n = t, a = o, s = e, i = r;
    this.source = N({
      inData: n,
      inColumns: a,
      inConfig: s,
      inTopN: i
    });
  }
  _buildSource(t) {
    return N(t);
  }
  _resolveActiveColumns(t) {
    return j(t);
  }
  get rawData() {
    return this.source.originalData;
  }
  get config() {
    return this.source.config;
  }
}
class W extends I {
  constructor({ inColumns: t = [], inConfig: o = {}, inData: e = {} } = {}) {
    const r = t, n = o, a = e;
    super({
      inColumns: r,
      inConfig: n
    }), this.library = this._buildLibrary({
      inSource: this.source,
      inData: a
    });
  }
  _buildLibrary({ inSource: t, inData: o = {} } = {}) {
    var a, s;
    const e = t, r = o;
    return {
      activeColumns: this._resolveActiveColumns({
        inColumnsCatalog: e == null ? void 0 : e.columns,
        inColumnKeys: (s = (a = e == null ? void 0 : e.config) == null ? void 0 : a.body) == null ? void 0 : s.columns
      }),
      formData: r && typeof r == "object" ? r : {}
    };
  }
  get activeColumns() {
    return this.library.activeColumns;
  }
  get formData() {
    return this.library.formData || {};
  }
  updateData({ inData: t = {} } = {}) {
    const o = t;
    return this.library.formData = o && typeof o == "object" ? o : {}, this.library.formData;
  }
}
const B = {
  form: "",
  body: "d-flex flex-column gap-3",
  field: "col-12",
  label: "form-label mb-1",
  controlWrapper: "",
  group: "input-group input-group-sm w-100",
  input: "form-control",
  button: "btn",
  foot: "d-flex align-items-center justify-content-end gap-2 pt-3 mt-3 border-top"
}, E = {
  form: "",
  body: "d-flex flex-column gap-3",
  field: "row align-items-center g-2",
  label: "col-sm-4 col-form-label text-sm-end mb-0",
  controlWrapper: "col-sm-8",
  group: "input-group input-group-sm w-100",
  input: "form-control",
  button: "btn",
  foot: "d-flex align-items-center justify-content-end gap-2 pt-3 mt-3 border-top"
}, F = {
  form: "mb-3",
  body: "row g-3 align-items-center",
  field: "col-auto d-flex align-items-center gap-2 mb-2",
  label: "col-form-label col-form-label-sm text-nowrap mb-0",
  controlWrapper: "",
  group: "input-group input-group-sm w-auto",
  input: "form-control",
  button: "btn",
  foot: "col-auto d-flex align-items-center gap-2 mt-2"
}, A = {
  stacked: B,
  horizontal: E,
  inline: F
}, L = {
  form: "bg-light p-3 rounded shadow-sm border",
  body: "",
  field: "",
  label: "fw-semibold text-secondary small",
  controlWrapper: "",
  group: "",
  input: "bg-white border-secondary border-opacity-25",
  button: "btn-outline-primary",
  foot: "border-secondary border-opacity-25"
}, O = {
  form: "bg-transparent border-0 shadow-none",
  body: "",
  field: "",
  label: "text-muted small",
  controlWrapper: "",
  group: "",
  input: "bg-light border-light-subtle",
  button: "btn-light border",
  foot: "border-light-subtle"
}, $ = {
  form: "card p-3 shadow-sm bg-dark text-light border-secondary",
  body: "",
  field: "",
  label: "fw-semibold text-light small",
  controlWrapper: "",
  group: "",
  input: "bg-dark text-light border-secondary",
  button: "btn-outline-light",
  foot: "border-secondary"
}, P = {
  form: "card p-3 shadow-sm bg-black text-light border-secondary border-opacity-50",
  body: "",
  field: "",
  label: "fw-bold text-white small",
  controlWrapper: "",
  group: "",
  input: "bg-dark text-white border-secondary",
  button: "btn-primary",
  foot: "border-secondary border-opacity-50"
}, C = {
  default: {
    form: "",
    body: "",
    field: "",
    label: "fw-semibold text-secondary small",
    controlWrapper: "",
    group: "",
    input: "",
    button: "btn-outline-secondary",
    foot: ""
  },
  light: L,
  extraLight: O,
  dark: $,
  extraDark: P
}, R = ({ inForm: c, inTheme: t = "default" } = {}) => {
  var r, n;
  const o = c, e = t || "default";
  if (o && (o.theme = e, o.classes = S({
    inLayout: o.layout,
    inTheme: o.theme,
    inConfigClasses: (n = (r = o.store) == null ? void 0 : r.config) == null ? void 0 : n.classes,
    inCustomClasses: o.customClasses
  }), o.formElement))
    return o.render();
}, S = ({
  inLayout: c = "stacked",
  inTheme: t = "default",
  inConfigClasses: o = {},
  inCustomClasses: e = {}
} = {}) => {
  const r = c || "stacked", n = t || "default", a = o || {}, s = e || {}, i = A[r] || A.stacked || {}, l = C[n] || C.default || {}, u = /* @__PURE__ */ new Set([
    ...Object.keys(i),
    ...Object.keys(l),
    ...Object.keys(a),
    ...Object.keys(s)
  ]), d = {};
  for (const m of u) {
    const p = [
      i[m],
      l[m],
      a[m],
      s[m]
    ].filter(Boolean).join(" ").split(/\s+/).filter(Boolean);
    d[m] = Array.from(new Set(p)).join(" ");
  }
  return d;
}, M = ({ inForm: c, inLayout: t = "stacked" } = {}) => {
  var r, n;
  const o = c, e = t || "stacked";
  if (o && (o.layout = e, o.classes = S({
    inLayout: o.layout,
    inTheme: o.theme,
    inConfigClasses: (n = (r = o.store) == null ? void 0 : r.config) == null ? void 0 : n.classes,
    inCustomClasses: o.customClasses
  }), o.formElement))
    return o.render();
}, _ = ({ inContainerConfig: c = null, inFormSpec: t = null, inClasses: o = {} } = {}) => {
  const e = c, r = t, n = o;
  if (!e)
    return r;
  const s = {
    class: (n == null ? void 0 : n.container) || (e == null ? void 0 : e.class) || "card shadow-sm border-0 mb-4"
  };
  e != null && e.id && (s.id = e.id);
  const i = [], l = e == null ? void 0 : e.header;
  if (l) {
    const m = (n == null ? void 0 : n.containerHeader) || (l == null ? void 0 : l.class) || "card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center", p = [], g = (l == null ? void 0 : l.title) || "Form", y = (l == null ? void 0 : l.icon) || "", b = (l == null ? void 0 : l.titleClass) || "fw-semibold text-secondary", f = [];
    if (y && f.push({
      tagName: "i",
      attributes: { class: `${y} me-1` }
    }), f.push({
      tagName: "span",
      textContent: g
    }), p.push({
      tagName: "div",
      attributes: { class: b },
      children: f
    }), Array.isArray(l == null ? void 0 : l.actions) && l.actions.length > 0) {
      const x = {
        tagName: "div",
        attributes: { class: "d-flex align-items-center gap-2" },
        children: l.actions.map((h) => {
          const w = [];
          h.icon && w.push({
            tagName: "i",
            attributes: { class: `${h.icon} me-1` }
          }), h.label && w.push({
            tagName: "span",
            textContent: h.label
          });
          const v = {
            type: h.type || "button",
            class: h.class || "btn btn-sm btn-outline-secondary"
          };
          return h.id && (v.id = h.id), h.title && (v.title = h.title), {
            tagName: "button",
            attributes: v,
            children: w
          };
        })
      };
      p.push(x);
    }
    i.push({
      tagName: "div",
      attributes: { class: m },
      children: p
    });
  }
  const u = (n == null ? void 0 : n.containerBody) || (e == null ? void 0 : e.bodyClass) || "card-body", d = r ? [r] : [];
  if (Array.isArray(e == null ? void 0 : e.extraControls) && d.push(...e.extraControls), i.push({
    tagName: "div",
    attributes: { class: u },
    children: d
  }), e != null && e.footer) {
    const m = e.footer, p = (n == null ? void 0 : n.containerFooter) || (m == null ? void 0 : m.class) || "card-footer bg-light py-2";
    i.push({
      tagName: "div",
      attributes: { class: p },
      textContent: m.text || ""
    });
  }
  return {
    tagName: "div",
    attributes: s,
    children: i
  };
}, K = ({ inHeadConfig: c = {}, inClasses: t = {} } = {}) => {
  const o = c, e = t, r = (o == null ? void 0 : o.title) || "", n = (o == null ? void 0 : o.subtitle) || "";
  if (!r && !n) return null;
  const a = [];
  return r && a.push({
    tagName: "div",
    textContent: r,
    attributes: {
      class: (e == null ? void 0 : e.headTitle) || "h5 fw-bold mb-1"
    }
  }), n && a.push({
    tagName: "div",
    textContent: n,
    attributes: {
      class: (e == null ? void 0 : e.headSubtitle) || "text-muted small"
    }
  }), {
    tagName: "div",
    attributes: {
      class: (e == null ? void 0 : e.head) || (o == null ? void 0 : o.class) || "pb-2 mb-3 border-bottom"
    },
    children: a
  };
}, q = ({ inColumn: c = {}, inClasses: t = {}, inConfig: o = {} } = {}) => {
  const e = c, r = t, n = o, a = e.key || "", s = e.label || a, i = e.type === "number" ? "number" : "text", l = {
    tagName: "label",
    textContent: s,
    attributes: r != null && r.label ? { class: r.label } : {}
  }, u = e.datalist === !0 || e.datalist !== !1 && i !== "number", d = e.datalistId || `${a}-datalist`, m = {
    type: i,
    name: a,
    placeholder: `Enter ${s}...`
  };
  r != null && r.input && (m.class = r.input), u && (m.list = d);
  const p = {
    tagName: "input",
    attributes: m
  };
  e.id && (p.attributes.id = e.id, l.attributes.for = e.id);
  const g = (n == null ? void 0 : n.searchButtons) === !1 || e.searchButton === !1 || e.search === !1, y = e.searchButton === !0 || e.search === !0 || (n == null ? void 0 : n.searchButtons) === !0, b = !g && (y || !!e.searchId);
  let f;
  if (b) {
    const x = {
      tagName: "button",
      textContent: "Search",
      attributes: {
        type: "button",
        id: e.searchId || `${a}-search`,
        name: `${a}-search`,
        "data-key": a,
        class: (r == null ? void 0 : r.button) || "btn btn-outline-secondary"
      }
    };
    f = {
      tagName: "div",
      attributes: r != null && r.group ? { class: r.group } : {},
      children: [p, x]
    };
  } else
    f = p;
  return r != null && r.controlWrapper && (f = {
    tagName: "div",
    attributes: { class: r.controlWrapper },
    children: [f]
  }), {
    tagName: "div",
    attributes: r != null && r.field ? { class: r.field } : {},
    children: [l, f]
  };
}, z = ({ inColumns: c = [], inConfig: t = {}, inClasses: o = {} } = {}) => {
  const e = c, r = t, n = o;
  if (!Array.isArray(e)) return { tagName: "div", children: [] };
  const a = e.map((i) => q({ inColumn: i, inClasses: n, inConfig: r }));
  return {
    tagName: "div",
    attributes: n != null && n.body ? { class: n.body } : {},
    children: a
  };
}, G = ({ inFootConfig: c = {}, inClasses: t = {} } = {}) => {
  const o = c, e = t, r = o == null ? void 0 : o.buttons;
  if (!Array.isArray(r) || r.length === 0) return null;
  const n = r.map((s) => {
    const l = s.variant === "primary" ? "btn btn-primary" : (e == null ? void 0 : e.button) || "btn btn-outline-secondary", u = s.class || l, d = {
      type: s.type || "button",
      name: s.name || "",
      class: u
    };
    return s.id && (d.id = s.id), {
      tagName: "button",
      textContent: s.label || s.name,
      attributes: d
    };
  });
  return {
    tagName: "div",
    attributes: {
      class: (e == null ? void 0 : e.foot) || (o == null ? void 0 : o.class) || "d-flex align-items-center justify-content-end gap-2 pt-3 mt-3 border-top"
    },
    children: n
  };
}, k = ({ inColumns: c = [], inConfig: t = {}, inClasses: o = {} } = {}) => {
  const e = c, r = t, n = o, a = K({ inHeadConfig: r == null ? void 0 : r.head, inClasses: n }), s = z({ inColumns: e, inConfig: r, inClasses: n }), i = G({ inFootConfig: r == null ? void 0 : r.foot, inClasses: n }), u = {
    tagName: "div",
    attributes: n != null && n.form ? { class: n.form } : {},
    children: [a, s, i].filter(Boolean)
  };
  return _({
    inContainerConfig: r == null ? void 0 : r.container,
    inFormSpec: u,
    inClasses: n
  });
}, J = ({ inForm: c } = {}) => {
  const t = c;
  return t != null && t.store ? k({
    inColumns: t.store.activeColumns,
    inConfig: t.store.config,
    inClasses: t.classes
  }) : null;
}, D = ({ inSpec: c } = {}) => {
  var i, l, u;
  const t = c;
  if (!t || typeof t != "object") return null;
  if (Array.isArray(t)) {
    const d = t.map((m) => D({ inSpec: m })).filter(Boolean);
    return d.length > 0 ? d : null;
  }
  const e = (Array.isArray(t.children) ? t.children : []).map((d) => D({ inSpec: d })).filter(Boolean), r = ((i = t.attributes) == null ? void 0 : i.id) || t.id, n = !!r, a = e.length > 0;
  if (!n && !a)
    return null;
  const s = {
    tagName: t.tagName
  };
  return r && (s.id = r), (l = t.attributes) != null && l.name && (s.name = t.attributes.name), (u = t.attributes) != null && u.type && (s.type = t.attributes.type), t.attributes && (s.attributes = t.attributes), e.length > 0 && (s.children = e), s;
}, U = ({ inForm: c } = {}) => {
  var l, u;
  const t = c;
  if (!t)
    return console.error("[json-to-dom-renderers:Form] Form instance (inForm) is required to render."), {
      treeWithIds: null,
      spec: null,
      element: null,
      error: "Form instance (inForm) is required"
    };
  const o = t.containerId, e = document.getElementById(o);
  if (!e)
    return console.error(`[json-to-dom-renderers:Form] Target container "#${o}" was not found in the DOM.`), {
      treeWithIds: null,
      spec: null,
      element: null,
      error: `Target container "#${o}" not found in DOM.`
    };
  const r = k({
    inColumns: t.store.activeColumns,
    inConfig: t.store.config,
    inClasses: t.classes
  }), n = D({ inSpec: r }), a = (u = (l = window.ks) == null ? void 0 : l["json-to-dom"]) == null ? void 0 : u.buildSpecElement;
  if (typeof a != "function")
    return console.error("json-to-dom buildSpecElement not found on window.ks"), {
      treeWithIds: n,
      spec: r,
      element: null
    };
  const s = a({ inSpec: r }), i = Array.isArray(s) ? s[0] : s;
  return e.innerHTML = "", e.appendChild(i), {
    treeWithIds: n,
    spec: r,
    element: i
  };
}, T = ({ inForm: c, inContainerId: t, inContainer: o, targetContainerId: e } = {}) => {
  const r = c, n = U({
    inForm: r
  });
  return n != null && n.element && (r.formElement = n.element, r.controlsTree = n.treeWithIds), n;
}, Q = async ({ inForm: c, inContainerId: t, inContainer: o, targetContainerId: e } = {}) => {
  const r = c, n = t || e, a = o;
  return r != null && r.dataProvider && (!r.store.formData || Object.keys(r.store.formData).length === 0) && await r.actions.load(), T({
    inForm: r,
    inContainerId: n,
    inContainer: a
  });
}, V = ({ inForm: c } = {}) => {
  const t = c;
  return {
    buildSpec: () => J({ inForm: t }),
    renderStructure: ({ inContainerId: n, inContainer: a, targetContainerId: s } = {}) => {
      const i = T({
        inForm: t,
        inContainerId: n,
        inContainer: a,
        targetContainerId: s
      });
      return i != null && i.element && (t.formElement = i.element, t.controlsTree = i.treeWithIds), i;
    },
    render: async ({ inContainerId: n, inContainer: a, targetContainerId: s } = {}) => {
      const i = await Q({
        inForm: t,
        inContainerId: n,
        inContainer: a,
        targetContainerId: s
      });
      return i != null && i.element && (t.formElement = i.element, t.controlsTree = i.treeWithIds), i;
    }
  };
}, X = ({ inForm: c } = {}) => {
  const t = c, o = async ({ inQuery: s = {} } = {}) => {
    var i, l;
    if (!(t != null && t.dataProvider) || typeof t.dataProvider.read != "function")
      return ((i = t == null ? void 0 : t.store) == null ? void 0 : i.formData) || {};
    try {
      const u = await t.dataProvider.read({ inQuery: s }), d = Array.isArray(u) ? u[0] : (u == null ? void 0 : u.data) || u || {};
      return t.store.updateData({ inData: d }), t.renderStructure(), d;
    } catch (u) {
      return console.error("[json-to-dom-form:load] Failed to load data via dataProvider:", u), ((l = t == null ? void 0 : t.store) == null ? void 0 : l.formData) || {};
    }
  }, e = ({ inData: s = {} } = {}) => (t.store.updateData({ inData: s }), t.renderStructure());
  return {
    load: o,
    update: e,
    getData: () => {
      if (!(t != null && t.formElement)) return {};
      const s = new FormData(t.formElement);
      return Object.fromEntries(s.entries());
    },
    setData: ({ inData: s = {} } = {}) => e({ inData: s }),
    reset: () => {
      t != null && t.formElement && typeof t.formElement.reset == "function" && t.formElement.reset();
    }
  };
};
class Y {
  constructor({
    columns: t = [],
    config: o = {},
    layout: e,
    theme: r,
    classes: n = {},
    dataProvider: a = null,
    targetContainerId: s = "form-container",
    inColumns: i,
    inConfig: l,
    inLayout: u,
    inTheme: d,
    inClasses: m,
    inDataProvider: p,
    inTargetContainerId: g
  } = {}) {
    const y = i || t, b = l || o, f = u || e || (b == null ? void 0 : b.layout) || "stacked", x = d || r || (b == null ? void 0 : b.theme) || "default", h = m || n, w = p || a, v = g || s;
    this.containerId = v, this.layout = f, this.theme = x, this.customClasses = h, this.classes = S({
      inLayout: this.layout,
      inTheme: this.theme,
      inConfigClasses: b == null ? void 0 : b.classes,
      inCustomClasses: this.customClasses
    }), this.dataProvider = w, this.formElement = null, this.controlsTree = null, this.store = new W({
      inColumns: y,
      inConfig: b
    }), this.methods = V({ inForm: this }), this.actions = X({ inForm: this }), this.spec = this.buildSpec();
  }
  setLayout({ inLayout: t, layout: o = "stacked" } = {}) {
    return M({ inForm: this, inLayout: t || o || "stacked" });
  }
  setTheme({ inTheme: t, theme: o = "default" } = {}) {
    return R({ inForm: this, inTheme: t || o || "default" });
  }
  buildSpec() {
    return this.methods.buildSpec();
  }
  renderStructure(t = {}) {
    return this.methods.renderStructure(t);
  }
  async render(t = {}) {
    return await this.methods.render(t);
  }
  async load(t = {}) {
    return await this.actions.load(t);
  }
  update(t = {}) {
    return this.actions.update(t);
  }
  getData() {
    return this.actions.getData();
  }
  setData(t = {}) {
    return this.actions.setData(t);
  }
  reset() {
    return this.actions.reset();
  }
  getControlsTree() {
    return this.controlsTree;
  }
  get columns() {
    return this.store.activeColumns;
  }
  get config() {
    return this.store.config;
  }
  get data() {
    return this.store.formData;
  }
}
const Z = "v3.0.0";
window.ks ?? (window.ks = {});
window.ks["json-to-dom-form"] = {
  version: Z,
  Form: Y
};
export {
  Y as Form,
  Y as default,
  Z as version
};
