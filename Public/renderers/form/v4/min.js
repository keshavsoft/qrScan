const T = ({ inData: u = [], inColumns: t = [], inConfig: n = {}, inTopN: e } = {}) => {
  const r = u, o = t, a = n, s = e;
  return {
    originalData: Array.isArray(r) ? typeof structuredClone == "function" ? structuredClone(r) : JSON.parse(JSON.stringify(r)) : [],
    columns: Array.isArray(o) ? o : [],
    config: a || {},
    topN: s
  };
}, L = ({ inColumnsCatalog: u = [], inColumnKeys: t = [] } = {}) => {
  const n = u, e = t;
  if (Array.isArray(e) && e.length > 0) {
    const r = new Map((Array.isArray(n) ? n : []).map((s) => [s.key, s])), o = [], a = [];
    for (const s of e) {
      const c = r.get(s);
      c ? a.push(c) : o.push(s);
    }
    return o.length > 0 && console.warn(
      `[json-to-dom-renderers] Warning: Config requested columns [${o.map((s) => `"${s}"`).join(", ")}] that do not exist in the columns catalog.`
    ), a;
  }
  return Array.isArray(n) ? n : [];
};
class R {
  constructor({ inData: t = [], inColumns: n = [], inConfig: e = {}, inTopN: r } = {}) {
    const o = t, a = n, s = e, c = r;
    this.source = T({
      inData: o,
      inColumns: a,
      inConfig: s,
      inTopN: c
    });
  }
  _buildSource(t) {
    return T(t);
  }
  _resolveActiveColumns(t) {
    return L(t);
  }
  get rawData() {
    return this.source.originalData;
  }
  get config() {
    return this.source.config;
  }
}
class O extends R {
  constructor({ inColumns: t = [], inConfig: n = {}, inData: e = {} } = {}) {
    const r = t, o = n, a = e;
    super({
      inColumns: r,
      inConfig: o
    }), this.library = this._buildLibrary({
      inSource: this.source,
      inData: a
    });
  }
  _buildLibrary({ inSource: t, inData: n = {} } = {}) {
    var a, s;
    const e = t, r = n;
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
    const n = t;
    return this.library.formData = n && typeof n == "object" ? n : {}, this.library.formData;
  }
}
const P = {
  form: "",
  body: "d-flex flex-column gap-3",
  field: "col-12",
  label: "form-label mb-1",
  controlWrapper: "",
  group: "input-group input-group-sm w-100",
  input: "form-control",
  button: "btn",
  foot: "d-flex align-items-center justify-content-end gap-2 pt-3 mt-3 border-top"
}, $ = {
  form: "",
  body: "d-flex flex-column gap-3",
  field: "row align-items-center g-2",
  label: "col-sm-4 col-form-label text-sm-end mb-0",
  controlWrapper: "col-sm-8",
  group: "input-group input-group-sm w-100",
  input: "form-control",
  button: "btn",
  foot: "d-flex align-items-center justify-content-end gap-2 pt-3 mt-3 border-top"
}, M = {
  form: "mb-3",
  body: "row g-3 align-items-center",
  field: "col-auto d-flex align-items-center gap-2 mb-2",
  label: "col-form-label col-form-label-sm text-nowrap mb-0",
  controlWrapper: "",
  group: "input-group input-group-sm w-auto",
  input: "form-control",
  button: "btn",
  foot: "col-auto d-flex align-items-center gap-2 mt-2"
}, z = {
  form: "",
  body: "row g-3",
  field: "col-12",
  label: "form-label mb-1",
  controlWrapper: "",
  group: "input-group input-group-sm w-100",
  input: "form-control",
  button: "btn",
  foot: "col-12 d-flex align-items-center justify-content-end gap-2 pt-3 mt-3 border-top"
}, j = {
  stacked: P,
  horizontal: $,
  inline: M,
  grid: z,
  "grid-2col": {
    form: "",
    body: "row g-3",
    field: "col-md-6",
    label: "form-label mb-1",
    controlWrapper: "",
    group: "input-group input-group-sm w-100",
    input: "form-control",
    button: "btn",
    foot: "col-12 d-flex align-items-center justify-content-end gap-2 pt-3 mt-3 border-top"
  },
  "grid-3col": {
    form: "",
    body: "row g-3",
    field: "col-md-4",
    label: "form-label mb-1",
    controlWrapper: "",
    group: "input-group input-group-sm w-100",
    input: "form-control",
    button: "btn",
    foot: "col-12 d-flex align-items-center justify-content-end gap-2 pt-3 mt-3 border-top"
  }
}, K = {
  form: "bg-light p-3 rounded shadow-sm border",
  body: "",
  field: "",
  label: "fw-semibold text-secondary small",
  controlWrapper: "",
  group: "",
  input: "bg-white border-secondary border-opacity-25",
  button: "btn-outline-primary",
  foot: "border-secondary border-opacity-25"
}, _ = {
  form: "bg-transparent border-0 shadow-none",
  body: "",
  field: "",
  label: "text-muted small",
  controlWrapper: "",
  group: "",
  input: "bg-light border-light-subtle",
  button: "btn-light border",
  foot: "border-light-subtle"
}, q = {
  form: "card p-3 shadow-sm bg-dark text-light border-secondary",
  body: "",
  field: "",
  label: "fw-semibold text-light small",
  controlWrapper: "",
  group: "",
  input: "bg-dark text-light border-secondary",
  button: "btn-outline-light",
  foot: "border-secondary"
}, G = {
  form: "card p-3 shadow-sm bg-black text-light border-secondary border-opacity-50",
  body: "",
  field: "",
  label: "fw-bold text-white small",
  controlWrapper: "",
  group: "",
  input: "bg-dark text-white border-secondary",
  button: "btn-primary",
  foot: "border-secondary border-opacity-50"
}, I = {
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
  light: K,
  extraLight: _,
  dark: q,
  extraDark: G
}, J = ({ inForm: u, inTheme: t = "default" } = {}) => {
  var r, o;
  const n = u, e = t || "default";
  if (n && (n.theme = e, n.classes = C({
    inLayout: n.layout,
    inTheme: n.theme,
    inConfigClasses: (o = (r = n.store) == null ? void 0 : r.config) == null ? void 0 : o.classes,
    inCustomClasses: n.customClasses
  }), n.formElement))
    return n.render();
}, C = ({
  inLayout: u = "stacked",
  inTheme: t = "default",
  inConfigClasses: n = {},
  inCustomClasses: e = {}
} = {}) => {
  const r = u || "stacked", o = t || "default", a = n || {}, s = e || {}, c = j[r] || j.stacked || {}, i = I[o] || I.default || {}, m = /* @__PURE__ */ new Set([
    ...Object.keys(c),
    ...Object.keys(i),
    ...Object.keys(a),
    ...Object.keys(s)
  ]), d = {};
  for (const l of m) {
    const p = [
      c[l],
      i[l],
      a[l],
      s[l]
    ].filter(Boolean).join(" ").split(/\s+/).filter(Boolean);
    d[l] = Array.from(new Set(p)).join(" ");
  }
  return d;
}, U = ({ inForm: u, inLayout: t = "stacked" } = {}) => {
  var r, o;
  const n = u, e = t || "stacked";
  if (n && (n.layout = e, n.classes = C({
    inLayout: n.layout,
    inTheme: n.theme,
    inConfigClasses: (o = (r = n.store) == null ? void 0 : r.config) == null ? void 0 : o.classes,
    inCustomClasses: n.customClasses
  }), n.formElement))
    return n.render();
}, H = ({ inContainerConfig: u = null, inFormSpec: t = null, inClasses: n = {} } = {}) => {
  const e = u, r = t, o = n;
  if (!e)
    return r;
  const s = {
    class: (o == null ? void 0 : o.container) || (e == null ? void 0 : e.class) || "card shadow-sm border-0 mb-4"
  };
  e != null && e.id && (s.id = e.id);
  const c = [], i = e == null ? void 0 : e.header;
  if (i) {
    const l = (o == null ? void 0 : o.containerHeader) || (i == null ? void 0 : i.class) || "card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center", p = [], h = (i == null ? void 0 : i.title) || "Form", y = (i == null ? void 0 : i.icon) || "", N = (i == null ? void 0 : i.titleClass) || "fw-semibold text-secondary", g = [];
    if (y && g.push({
      tagName: "i",
      attributes: { class: `${y} me-1` }
    }), g.push({
      tagName: "span",
      textContent: h
    }), p.push({
      tagName: "div",
      attributes: { class: N },
      children: g
    }), Array.isArray(i == null ? void 0 : i.actions) && i.actions.length > 0) {
      const f = {
        tagName: "div",
        attributes: { class: "d-flex align-items-center gap-2" },
        children: i.actions.map((b) => {
          const w = [];
          b.icon && w.push({
            tagName: "i",
            attributes: { class: `${b.icon} me-1` }
          }), b.label && w.push({
            tagName: "span",
            textContent: b.label
          });
          const x = {
            type: b.type || "button",
            class: b.class || "btn btn-sm btn-outline-secondary"
          };
          return b.id && (x.id = b.id), b.title && (x.title = b.title), {
            tagName: "button",
            attributes: x,
            children: w
          };
        })
      };
      p.push(f);
    }
    c.push({
      tagName: "div",
      attributes: { class: l },
      children: p
    });
  }
  const m = (o == null ? void 0 : o.containerBody) || (e == null ? void 0 : e.bodyClass) || "card-body", d = r ? [r] : [];
  if (Array.isArray(e == null ? void 0 : e.extraControls) && d.push(...e.extraControls), c.push({
    tagName: "div",
    attributes: { class: m },
    children: d
  }), e != null && e.footer) {
    const l = e.footer, p = (o == null ? void 0 : o.containerFooter) || (l == null ? void 0 : l.class) || "card-footer bg-light py-2";
    c.push({
      tagName: "div",
      attributes: { class: p },
      textContent: l.text || ""
    });
  }
  return {
    tagName: "div",
    attributes: s,
    children: c
  };
}, Q = ({ inHeadConfig: u = {}, inClasses: t = {} } = {}) => {
  const n = u, e = t, r = (n == null ? void 0 : n.title) || "", o = (n == null ? void 0 : n.subtitle) || "";
  if (!r && !o) return null;
  const a = [];
  return r && a.push({
    tagName: "div",
    textContent: r,
    attributes: {
      class: (e == null ? void 0 : e.headTitle) || "h5 fw-bold mb-1"
    }
  }), o && a.push({
    tagName: "div",
    textContent: o,
    attributes: {
      class: (e == null ? void 0 : e.headSubtitle) || "text-muted small"
    }
  }), {
    tagName: "div",
    attributes: {
      class: (e == null ? void 0 : e.head) || (n == null ? void 0 : n.class) || "pb-2 mb-3 border-bottom"
    },
    children: a
  };
}, W = ({ inColumn: u = {}, inClasses: t = {}, inConfig: n = {} } = {}) => {
  var D, S, k;
  const e = u, r = t, o = n, a = e.key || "", s = e.label || a, c = e.type === "number" ? "number" : "text", i = ((D = o == null ? void 0 : o.control) == null ? void 0 : D.alignment) || (o == null ? void 0 : o.alignment) || ((o == null ? void 0 : o.layout) === "horizontal" ? "horizontal" : "stacked"), m = i === "horizontal" ? (r == null ? void 0 : r.label) || "col-sm-4 col-form-label text-sm-end mb-0" : (r == null ? void 0 : r.label) || "form-label mb-1", d = {
    tagName: "label",
    textContent: s,
    attributes: m ? { class: m } : {}
  }, l = e.datalist === !0 || e.datalist !== !1 && c !== "number", p = e.datalistId || `${a}-datalist`, h = {
    type: c,
    name: a,
    placeholder: `Enter ${s}...`
  };
  r != null && r.input && (h.class = r.input), l && (h.list = p);
  const y = {
    tagName: "input",
    attributes: h
  };
  e.id && (y.attributes.id = e.id, d.attributes.for = e.id);
  const N = ((S = o == null ? void 0 : o.control) == null ? void 0 : S.searchButtons) === !1 || (o == null ? void 0 : o.searchButtons) === !1 || e.searchButton === !1 || e.search === !1, g = ((k = o == null ? void 0 : o.control) == null ? void 0 : k.searchButtons) === !0 || (o == null ? void 0 : o.searchButtons) === !0 || e.searchButton === !0 || e.search === !0, f = !N && (g || !!e.searchId);
  let b;
  if (f) {
    const v = {
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
    b = {
      tagName: "div",
      attributes: r != null && r.group ? { class: r.group } : {},
      children: [y, v]
    };
  } else
    b = y;
  r != null && r.controlWrapper && (b = {
    tagName: "div",
    attributes: { class: r.controlWrapper },
    children: [b]
  });
  let w = "";
  if (o != null && o.grid) {
    const v = typeof o.grid == "object" ? o.grid.columns || o.grid.cols : o.grid;
    v === 1 ? w = "col-12" : v === 2 ? w = "col-md-6" : v === 3 ? w = "col-md-4" : v === 4 && (w = "col-md-3");
  }
  const x = e.colClass || e.class || w || (r == null ? void 0 : r.field) || "";
  if (i === "horizontal") {
    const v = r != null && r.controlWrapper ? b : {
      tagName: "div",
      attributes: { class: "col-sm-8" },
      children: [b]
    };
    return {
      tagName: "div",
      attributes: x ? { class: x } : {},
      children: [{
        tagName: "div",
        attributes: { class: "row align-items-center g-2" },
        children: [d, v]
      }]
    };
  }
  return {
    tagName: "div",
    attributes: x ? { class: x } : {},
    children: [d, b]
  };
}, V = ({ inColumns: u = [], inConfig: t = {}, inClasses: n = {} } = {}) => {
  const e = u, r = t, o = n;
  if (!Array.isArray(e)) return { tagName: "div", children: [] };
  if (Array.isArray(r == null ? void 0 : r.sections) && r.sections.length > 0) {
    const i = /* @__PURE__ */ new Map();
    e.forEach((l) => {
      l && l.key && i.set(l.key, l);
    });
    const m = r.sections.map((l) => {
      const y = (Array.isArray(l.columns) ? l.columns : []).map((f) => typeof f == "string" ? i.get(f) || { key: f, label: f } : f).map((f) => W({ inColumn: f, inClasses: o, inConfig: r })), N = {
        tagName: "div",
        attributes: l.bodyClass ? { class: l.bodyClass } : o != null && o.sectionBody ? { class: o.sectionBody } : { class: "d-flex flex-column gap-3" },
        children: y
      };
      if (l.card) {
        const f = [];
        return l.title && f.push({
          tagName: "div",
          attributes: { class: "card-header bg-light py-2 fw-semibold d-flex align-items-center gap-2" },
          children: [
            ...l.icon ? [{ tagName: "i", attributes: { class: l.icon } }] : [],
            { tagName: "span", textContent: l.title }
          ]
        }), f.push({
          tagName: "div",
          attributes: { class: "card-body" },
          children: [N]
        }), {
          tagName: "div",
          attributes: { class: l.class || "col-md-6" },
          children: [
            {
              tagName: "div",
              attributes: { class: "card h-100 shadow-sm border-0" },
              children: f
            }
          ]
        };
      }
      const g = [];
      return l.title && g.push({
        tagName: "h6",
        attributes: { class: l.titleClass || "fw-bold text-secondary mb-3 pb-2 border-bottom d-flex align-items-center gap-2" },
        children: [
          ...l.icon ? [{ tagName: "i", attributes: { class: l.icon } }] : [],
          { tagName: "span", textContent: l.title }
        ]
      }), g.push(N), {
        tagName: "div",
        attributes: { class: l.class || "col-md-6" },
        children: g
      };
    });
    return {
      tagName: "div",
      attributes: {
        class: r.sectionsRowClass || "row g-4"
      },
      children: m
    };
  }
  const a = e.map((i) => W({ inColumn: i, inClasses: o, inConfig: r }));
  let s = (o == null ? void 0 : o.body) || "";
  return r != null && r.grid && (s = `row g-${typeof r.grid == "object" && r.grid.gap !== void 0 ? r.grid.gap : 3}`), {
    tagName: "div",
    attributes: s ? { class: s } : {},
    children: a
  };
}, X = ({ inFootConfig: u = {}, inClasses: t = {} } = {}) => {
  const n = u, e = t, r = n == null ? void 0 : n.buttons;
  if (!Array.isArray(r) || r.length === 0) return null;
  const o = r.map((s) => {
    const i = s.variant === "primary" ? "btn btn-primary" : (e == null ? void 0 : e.button) || "btn btn-outline-secondary", m = s.class || i, d = {
      type: s.type || "button",
      name: s.name || "",
      class: m
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
      class: (e == null ? void 0 : e.foot) || (n == null ? void 0 : n.class) || "d-flex align-items-center justify-content-end gap-2 pt-3 mt-3 border-top"
    },
    children: o
  };
}, B = ({ inColumns: u = [], inConfig: t = {}, inClasses: n = {} } = {}) => {
  const e = u, r = t, o = n, a = Q({ inHeadConfig: r == null ? void 0 : r.head, inClasses: o }), s = V({ inColumns: e, inConfig: r, inClasses: o }), c = X({ inFootConfig: r == null ? void 0 : r.foot, inClasses: o }), m = {
    tagName: "div",
    attributes: o != null && o.form ? { class: o.form } : {},
    children: [a, s, c].filter(Boolean)
  };
  return H({
    inContainerConfig: r == null ? void 0 : r.container,
    inFormSpec: m,
    inClasses: o
  });
}, Y = ({ inForm: u } = {}) => {
  const t = u;
  return t != null && t.store ? B({
    inColumns: t.store.activeColumns,
    inConfig: t.store.config,
    inClasses: t.classes
  }) : null;
}, A = ({ inSpec: u } = {}) => {
  var c, i, m;
  const t = u;
  if (!t || typeof t != "object") return null;
  if (Array.isArray(t)) {
    const d = t.map((l) => A({ inSpec: l })).filter(Boolean);
    return d.length > 0 ? d : null;
  }
  const e = (Array.isArray(t.children) ? t.children : []).map((d) => A({ inSpec: d })).filter(Boolean), r = ((c = t.attributes) == null ? void 0 : c.id) || t.id, o = !!r, a = e.length > 0;
  if (!o && !a)
    return null;
  const s = {
    tagName: t.tagName
  };
  return r && (s.id = r), (i = t.attributes) != null && i.name && (s.name = t.attributes.name), (m = t.attributes) != null && m.type && (s.type = t.attributes.type), t.attributes && (s.attributes = t.attributes), e.length > 0 && (s.children = e), s;
}, Z = ({ inForm: u, inContainerId: t, inContainer: n } = {}) => {
  var l, p;
  const e = u, r = t, o = n;
  if (!e)
    return console.error("[json-to-dom-renderers:Form] Form instance (inForm) is required to render."), {
      treeWithIds: null,
      spec: null,
      element: null,
      error: "Form instance (inForm) is required"
    };
  const a = B({
    inColumns: e.store.activeColumns,
    inConfig: e.store.config,
    inClasses: e.classes
  }), s = A({ inSpec: a }), c = (p = (l = window.ks) == null ? void 0 : l["json-to-dom"]) == null ? void 0 : p.buildSpecElement;
  if (typeof c != "function")
    return console.error("json-to-dom buildSpecElement not found on window.ks"), {
      treeWithIds: s,
      spec: a,
      element: null
    };
  const i = c({ inSpec: a }), m = Array.isArray(i) ? i[0] : i;
  let d = null;
  if (o instanceof HTMLElement)
    d = o;
  else {
    const h = r || e.containerId;
    h && (d = document.getElementById(h));
  }
  return d && (d.innerHTML = "", d.appendChild(m)), e.formElement = m, e.controlsTree = s, {
    treeWithIds: s,
    spec: a,
    element: m,
    store: e.store
  };
}, E = ({ inForm: u, inContainerId: t, inContainer: n, targetContainerId: e } = {}) => {
  const r = u, s = Z({
    inForm: r,
    inContainerId: t || e,
    inContainer: n
  });
  return s != null && s.element && (r.formElement = s.element, r.controlsTree = s.treeWithIds), s;
}, tt = async ({ inForm: u, inContainerId: t, inContainer: n, targetContainerId: e } = {}) => {
  const r = u, o = t || e, a = n;
  return r != null && r.dataProvider && (!r.store.formData || Object.keys(r.store.formData).length === 0) && await r.actions.load(), E({
    inForm: r,
    inContainerId: o,
    inContainer: a
  });
}, et = ({ inForm: u } = {}) => {
  const t = u;
  return {
    buildSpec: () => Y({ inForm: t }),
    renderStructure: ({ inContainerId: o, inContainer: a, targetContainerId: s } = {}) => {
      const c = E({
        inForm: t,
        inContainerId: o,
        inContainer: a,
        targetContainerId: s
      });
      return c != null && c.element && (t.formElement = c.element, t.controlsTree = c.treeWithIds), c;
    },
    render: async ({ inContainerId: o, inContainer: a, targetContainerId: s } = {}) => {
      const c = await tt({
        inForm: t,
        inContainerId: o,
        inContainer: a,
        targetContainerId: s
      });
      return c != null && c.element && (t.formElement = c.element, t.controlsTree = c.treeWithIds), c;
    }
  };
}, rt = ({ inForm: u } = {}) => {
  const t = u, n = async ({ inQuery: s = {} } = {}) => {
    var c, i;
    if (!(t != null && t.dataProvider) || typeof t.dataProvider.read != "function")
      return ((c = t == null ? void 0 : t.store) == null ? void 0 : c.formData) || {};
    try {
      const m = await t.dataProvider.read({ inQuery: s }), d = Array.isArray(m) ? m[0] : (m == null ? void 0 : m.data) || m || {};
      return t.store.updateData({ inData: d }), t.renderStructure(), d;
    } catch (m) {
      return console.error("[json-to-dom-form:load] Failed to load data via dataProvider:", m), ((i = t == null ? void 0 : t.store) == null ? void 0 : i.formData) || {};
    }
  }, e = ({ inData: s = {} } = {}) => (t.store.updateData({ inData: s }), t.renderStructure());
  return {
    load: n,
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
class ot {
  constructor({
    data: t = {},
    columns: n = [],
    config: e = {},
    layout: r,
    theme: o,
    classes: a = {},
    dataProvider: s = null,
    targetContainerId: c = ""
  } = {}) {
    const i = t, m = n, d = e, l = r || (d == null ? void 0 : d.layout) || "stacked", p = o || (d == null ? void 0 : d.theme) || "default", h = a, y = s, N = c;
    this.containerId = N, this.layout = l, this.theme = p, this.customClasses = h, this.classes = C({
      inLayout: this.layout,
      inTheme: this.theme,
      inConfigClasses: d == null ? void 0 : d.classes,
      inCustomClasses: this.customClasses
    }), this.dataProvider = y, this.formElement = null, this.controlsTree = null, this.store = new O({
      inData: i,
      inColumns: m,
      inConfig: d
    }), this.methods = et({ inForm: this }), this.actions = rt({ inForm: this }), this.spec = this.buildSpec();
  }
  setLayout({ inLayout: t, layout: n = "stacked" } = {}) {
    return U({ inForm: this, inLayout: t || n || "stacked" });
  }
  setTheme({ inTheme: t, theme: n = "default" } = {}) {
    return J({ inForm: this, inTheme: t || n || "default" });
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
const nt = "v4.0.0";
window.ks ?? (window.ks = {});
window.ks["json-to-dom-form"] = {
  version: nt,
  Form: ot
};
export {
  ot as Form,
  ot as default,
  nt as version
};
