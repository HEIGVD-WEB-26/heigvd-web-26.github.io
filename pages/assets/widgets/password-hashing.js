// Uses bcryptjs (exposed as window.dcodeIO.bcrypt on older builds, or window.bcrypt on newer).
function bcryptLib() {
  return window.bcrypt || (window.dcodeIO && window.dcodeIO.bcrypt);
}

window.SecWidgets.hashSha256 = async function (input) {
  const buf = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest('SHA-256', buf);
  return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('');
};

window.SecWidgets.hashBcrypt = function (input, cost) {
  const b = bcryptLib();
  if (!b) throw new Error('bcryptjs not loaded');
  const salt = b.genSaltSync(cost);
  return b.hashSync(input, salt);
};

class PasswordHashing extends HTMLElement {
  connectedCallback() {
    this.password = 'hunter2';
    this.cost = 8;
    this.classList.add('widget');
    this.render();
    this.compute();
  }

  render() {
    const { el } = window.SecWidgets;
    this.innerHTML = '';
    const header = el('div', { class: 'widget-header' }, 'Password hashing comparison');

    const left = el('div', { class: 'pane' });
    left.append(el('div', { class: 'pane-title' }, 'Input'));
    const input = el('input', { type: 'text', 'aria-label': 'Password to hash' });
    input.value = this.password;
    left.append(input);
    left.append(el('div', { class: 'pane-title', style: 'margin-top: 10px' }, 'bcrypt cost (log2 rounds)'));
    const slider = el('input', { type: 'range', min: '4', max: '12', step: '1', 'aria-label': 'bcrypt cost (log2 rounds)' });
    slider.value = String(this.cost);
    const costLabel = el('span', { style: 'margin-left: 8px' }, String(this.cost));
    left.append(slider, costLabel);
    const btn = el('button', null, 'Hash');
    left.append(btn);

    const right = el('div', { class: 'pane' });
    right.append(el('div', { class: 'pane-title' }, 'Outputs'));
    const out = el('div');
    right.append(out);
    right.append(el('div', { class: 'verdict muted', style: 'margin-top: 10px' },
      'Plain: catastrophic on breach. SHA-256: rainbow-table-able, even with salt is fast to brute force. Bcrypt: cost-tunable, modern.'));

    slider.addEventListener('input', () => { this.cost = parseInt(slider.value, 10); costLabel.textContent = String(this.cost); });
    btn.addEventListener('click', () => { this.password = input.value; this.compute(); });

    const body = el('div', { class: 'widget-body' }, el('div', { class: 'panes' }, left, right));
    this.append(header, body);
    this.outEl = out;
  }

  async compute() {
    if (!this.outEl) return;
    this.outEl.innerHTML = 'Computing…';
    const sha = await window.SecWidgets.hashSha256(this.password);
    let bcrypt = '(bcryptjs not loaded)';
    let bcryptMs = 0;
    try {
      const t0 = performance.now();
      bcrypt = window.SecWidgets.hashBcrypt(this.password, this.cost);
      bcryptMs = Math.round(performance.now() - t0);
    } catch (e) { bcrypt = '(' + e.message + ')'; }
    this.outEl.innerHTML = `
      <div><strong>Plain</strong> <code>${escapeHtml(this.password)}</code></div>
      <div style="margin-top: 6px"><strong>SHA-256</strong> <code style="font-size:0.8em">${sha}</code></div>
      <div style="margin-top: 6px"><strong>bcrypt(cost=${this.cost})</strong> <code style="font-size:0.8em">${escapeHtml(bcrypt)}</code> <span style="color:var(--fg-muted)">~${bcryptMs}ms</span></div>
    `;
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

customElements.define('password-hashing', PasswordHashing);
