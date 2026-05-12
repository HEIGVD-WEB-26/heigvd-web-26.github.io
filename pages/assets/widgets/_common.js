// Shared helpers for the security page widgets.
// Loaded via <script> tag; exposes globals under window.SecWidgets.
window.SecWidgets = window.SecWidgets || {};

window.SecWidgets.el = function (tag, attrs, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (k === 'class') node.className = v;
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v);
  }
  for (const c of children) {
    if (c == null) continue;
    node.append(c instanceof Node ? c : document.createTextNode(String(c)));
  }
  return node;
};

window.SecWidgets.verdict = function (text, kind /* 'ok' | 'bad' | 'muted' */) {
  const d = document.createElement('div');
  d.className = `verdict ${kind}`;
  d.textContent = text;
  return d;
};
