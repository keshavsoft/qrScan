const I = ({ inItems: u = [], inOnAction: e } = {}) => {
  const t = u, s = e, i = document.createElement("ul");
  return i.className = "nav d-none d-md-flex align-items-center my-1 text-small text-center", t.forEach((l) => {
    const o = document.createElement("li"), n = document.createElement("a");
    n.href = l.href || "#";
    const c = l.active ? "active text-primary" : l.class || "text-white";
    n.className = `nav-link px-3 ${c}`, l.id && (n.id = `menu-desktop-${l.id}`, n.setAttribute("data-item-id", l.id)), l.title && (n.title = l.title);
    let m = "";
    if (l.icon) {
      const d = l.active ? "text-primary" : "";
      m += `<i class="bi ${l.icon} d-block mx-auto mb-1 fs-5 ${d}"></i>`;
    }
    m += `<span>${l.label || ""}</span>`, n.innerHTML = m, (l.isAction || typeof s == "function") && n.addEventListener("click", (d) => {
      typeof s == "function" && s({ inItem: l, inEvent: d });
    }), o.appendChild(n), i.appendChild(o);
  }), i;
}, N = ({
  inItems: u = [],
  inCollapseId: e = "mobileNavCollapse",
  inMobileFlavor: t = "list",
  inOnAction: s
} = {}) => {
  const i = u, l = e, o = t, n = s, c = document.createElement("div");
  c.className = "collapse d-md-none w-100", c.id = l;
  const m = document.createElement("div");
  if (m.className = "container-fluid px-2 pt-3 pb-2 border-top border-secondary mt-2", o === "grid" || o === "tiles") {
    const d = document.createElement("div");
    d.className = "row row-cols-3 g-2 text-center text-small", i.forEach((a) => {
      const r = document.createElement("div");
      r.className = "col";
      const p = document.createElement("a");
      p.href = a.href || "#";
      const b = a.active ? "border-primary" : a.id === "reset" ? "border-info" : "border-secondary";
      p.className = `nav-link py-2 rounded bg-dark border ${b} text-white`, a.id && (p.id = `menu-mobile-${a.id}`, p.setAttribute("data-item-id", a.id));
      let h = "";
      if (a.icon) {
        const f = a.active ? "text-primary" : a.id === "reset" ? "text-info" : "text-white";
        h += `<i class="bi ${a.icon} d-block mx-auto mb-1 fs-4 ${f}"></i>`;
      }
      const x = a.active ? "text-primary fw-semibold" : a.id === "reset" ? "text-info" : "text-white";
      h += `<span class="${x}">${a.label || ""}</span>`, p.innerHTML = h, (a.isAction || typeof n == "function") && p.addEventListener("click", (f) => {
        typeof n == "function" && n({ inItem: a, inEvent: f });
      }), r.appendChild(p), d.appendChild(r);
    }), m.appendChild(d);
  } else {
    const d = document.createElement("div");
    d.className = "list-group list-group-flush bg-transparent", i.forEach((a) => {
      const r = document.createElement("a");
      r.href = a.href || "#";
      const p = a.active ? "bg-primary text-white fw-bold shadow-sm" : a.id === "reset" ? "bg-dark text-info border-secondary" : "bg-dark text-white-50 border-secondary";
      r.className = `list-group-item list-group-item-action d-flex align-items-center py-2 px-3 mb-1 rounded border ${p}`, a.id && (r.id = `menu-mobile-${a.id}`, r.setAttribute("data-item-id", a.id));
      let b = "";
      if (a.icon) {
        const C = a.active ? "text-white" : a.id === "reset" ? "text-info" : "text-light";
        b = `<i class="bi ${a.icon} fs-5 me-3 ${C}" style="width: 24px; text-align: center;"></i>`;
      }
      const x = `<span class="${a.active ? "text-white" : a.id === "reset" ? "text-info" : "text-light"} flex-grow-1">${a.label || ""}</span>`, f = '<i class="bi bi-chevron-right text-secondary small"></i>';
      r.innerHTML = `${b}${x}${f}`, (a.isAction || typeof n == "function") && r.addEventListener("click", (C) => {
        typeof n == "function" && n({ inItem: a, inEvent: C });
      }), d.appendChild(r);
    }), m.appendChild(d);
  }
  return c.appendChild(m), c;
}, A = ({ inSubHeader: u = {}, inOnAction: e } = {}) => {
  const t = u, s = e;
  if (!t || !t.status && !t.actions)
    return null;
  const i = document.createElement("div");
  i.className = "px-3 py-2 border-bottom bg-white";
  const l = document.createElement("div");
  if (l.className = "container-fluid px-2 px-md-4 d-flex flex-wrap align-items-center justify-content-between gap-2", t.status) {
    const o = document.createElement("div");
    if (o.className = "d-flex align-items-center", t.status.label) {
      const c = document.createElement("span");
      c.className = "text-secondary small me-2", c.textContent = t.status.label, o.appendChild(c);
    }
    const n = document.createElement("span");
    n.id = t.status.id || "record-count-badge", n.className = t.status.badgeClass || "badge bg-secondary", n.textContent = t.status.badgeText || "Ready", o.appendChild(n), l.appendChild(o);
  }
  if (Array.isArray(t.actions) && t.actions.length > 0) {
    const o = document.createElement("div");
    o.className = "d-flex gap-2", t.actions.forEach((n) => {
      const c = document.createElement("button");
      c.type = "button", c.id = n.id || "", c.className = n.class || "btn btn-sm btn-primary", n.title && (c.title = n.title);
      let m = "";
      n.icon && (m += `<i class="bi ${n.icon} me-1"></i> `), m += n.label || "", c.innerHTML = m, c.addEventListener("click", (d) => {
        typeof s == "function" && s({ inAction: n, inEvent: d });
      }), o.appendChild(c);
    }), l.appendChild(o);
  }
  return i.appendChild(l), i;
}, $ = ({ inMenu: u } = {}) => {
  const e = u, t = typeof (e == null ? void 0 : e.containerId) == "string" ? document.getElementById(e.containerId) : e == null ? void 0 : e.containerId;
  if (!t)
    return console.warn(`[json-to-dom-menu] Container '#${e == null ? void 0 : e.containerId}' not found.`), null;
  const s = document.createElement("header");
  s.className = "mb-4 shadow-sm";
  const i = document.createElement("div");
  i.className = "px-3 py-2 text-bg-dark border-bottom";
  const l = document.createElement("div");
  l.className = "container-fluid px-2 px-md-4 d-flex flex-wrap align-items-center justify-content-between";
  const o = e.brand, n = !!(o && (o.title || o.iconText || o.subtitle));
  if (n) {
    const r = document.createElement("a");
    if (r.href = o.href || "./", r.className = "d-flex align-items-center text-white text-decoration-none my-1", o.iconText) {
      const b = document.createElement("span");
      b.className = "brand-icon me-2", b.textContent = o.iconText, r.appendChild(b);
    }
    const p = document.createElement("div");
    p.className = "d-flex flex-column", p.innerHTML = `
            <span class="fs-5 fw-bold lh-1">${o.title || ""}</span>
            ${o.subtitle ? `<small class="text-secondary" style="font-size: 0.72rem;">${o.subtitle}</small>` : ""}
        `, r.appendChild(p), l.appendChild(r);
  } else
    l.className = "container-fluid px-2 px-md-4 d-flex flex-wrap align-items-center justify-content-center position-relative";
  const c = I({
    inItems: e.items,
    inOnAction: e.handleItemClick.bind(e)
  });
  l.appendChild(c);
  const m = e.collapseId || "mobileNavCollapse", d = document.createElement("button");
  d.type = "button", d.className = n ? "btn btn-outline-secondary text-white border-secondary d-md-none my-1 px-2 py-1" : "btn btn-outline-secondary text-white border-secondary d-md-none my-1 px-2 py-1 position-absolute end-0 me-3", d.setAttribute("data-bs-toggle", "collapse"), d.setAttribute("data-bs-target", `#${m}`), d.setAttribute("aria-controls", m), d.setAttribute("aria-expanded", "false"), d.setAttribute("aria-label", "Toggle navigation"), d.innerHTML = '<i class="bi bi-list fs-3 lh-1"></i>', l.appendChild(d), i.appendChild(l);
  const a = N({
    inItems: e.items,
    inCollapseId: m,
    inMobileFlavor: e.mobileFlavor,
    inOnAction: e.handleItemClick.bind(e)
  });
  if (i.appendChild(a), s.appendChild(i), e.subHeader) {
    const r = A({
      inSubHeader: e.subHeader,
      inOnAction: e.handleActionClick.bind(e)
    });
    r && s.appendChild(r);
  }
  return t.innerHTML = "", t.appendChild(s), {
    element: s,
    collapseElement: a
  };
};
class H {
  constructor({
    brand: e = {},
    items: t = [],
    subHeader: s = null,
    targetContainerId: i = "header-container",
    collapseId: l = "mobileNavCollapse",
    mobileFlavor: o = "list",
    onItemClick: n = null,
    onActionClick: c = null,
    inBrand: m,
    inItems: d,
    inSubHeader: a,
    inTargetContainerId: r,
    inCollapseId: p,
    inMobileFlavor: b,
    inOnItemClick: h,
    inOnActionClick: x
  } = {}) {
    const f = m ?? e, C = d ?? t, g = a ?? s, v = r ?? i, y = p ?? l, E = b ?? o, k = h ?? n, w = x ?? c;
    this.brand = f, this.items = Array.isArray(C) ? [...C] : [], this.subHeader = g, this.containerId = v, this.collapseId = y, this.mobileFlavor = E, this.itemClickCallback = k, this.actionClickCallback = w, this.headerElement = null, this.mobileCollapseElement = null;
  }
  render({ inContainerId: e } = {}) {
    const t = e;
    t && (this.containerId = t);
    const s = $({ inMenu: this });
    return s && (this.headerElement = s.element, this.mobileCollapseElement = s.collapseElement), s;
  }
  handleItemClick({ inItem: e, inEvent: t } = {}) {
    const s = e, i = t;
    typeof this.itemClickCallback == "function" && this.itemClickCallback({ inItem: s, inEvent: i });
  }
  handleActionClick({ inAction: e, inEvent: t } = {}) {
    const s = e, i = t;
    typeof this.actionClickCallback == "function" && this.actionClickCallback({ inAction: s, inEvent: i });
  }
  onItemClick({ inCallback: e } = {}) {
    const t = e;
    return this.itemClickCallback = t, this;
  }
  onActionClick({ inCallback: e } = {}) {
    const t = e;
    return this.actionClickCallback = t, this;
  }
  setBadge({ inText: e = "", inType: t = "secondary", inClass: s = "" } = {}) {
    var m, d;
    const i = e, l = t, o = s, n = ((d = (m = this.subHeader) == null ? void 0 : m.status) == null ? void 0 : d.id) || "record-count-badge", c = document.getElementById(n);
    c && (o ? c.className = o : l === "success" ? c.className = "badge bg-success" : l === "warning" ? c.className = "badge bg-warning text-dark" : c.className = `badge bg-${l}`, c.textContent = i);
  }
  collapseMobile() {
    var t, s;
    const e = document.getElementById(this.collapseId);
    if (e && e.classList.contains("show")) {
      const i = (s = (t = window.bootstrap) == null ? void 0 : t.Collapse) == null ? void 0 : s.getInstance(e);
      i && i.hide();
    }
  }
  expandMobile() {
    var t, s;
    const e = document.getElementById(this.collapseId);
    if (e && !e.classList.contains("show")) {
      const i = (s = (t = window.bootstrap) == null ? void 0 : t.Collapse) == null ? void 0 : s.getOrCreateInstance(e);
      i && i.show();
    }
  }
  updateItems({ inItems: e = [] } = {}) {
    const t = e;
    return this.items = Array.isArray(t) ? [...t] : [], this.render();
  }
}
const T = "v2.0.0";
window.ks ?? (window.ks = {});
window.ks["json-to-dom-menu"] = {
  version: T,
  Menu: H
};
export {
  H as Menu,
  H as default,
  T as version
};
