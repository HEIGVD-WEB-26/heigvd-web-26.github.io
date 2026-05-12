// Pure helpers — testable.
function b64urlEncode(bytes) {
  let s = '';
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
}
function b64urlDecodeToBytes(str) {
  const pad = '='.repeat((4 - str.length % 4) % 4);
  const b64 = (str + pad).replaceAll('-', '+').replaceAll('_', '/');
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
function b64urlDecodeToString(str) {
  return new TextDecoder().decode(b64urlDecodeToBytes(str));
}

window.SecWidgets.jwtDecode = function (token) {
  const [h, p, s] = token.split('.');
  if (!h || !p) throw new Error('not a JWT');
  return {
    header: JSON.parse(b64urlDecodeToString(h)),
    payload: JSON.parse(b64urlDecodeToString(p)),
    signature: s || '',
    signingInput: `${h}.${p}`,
  };
};

window.SecWidgets.jwtSignHs256 = async function (signingInput, secret) {
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(signingInput));
  return b64urlEncode(new Uint8Array(sig));
};

window.SecWidgets.jwtBuild = async function (header, payload, secret) {
  const h = b64urlEncode(new TextEncoder().encode(JSON.stringify(header)));
  const p = b64urlEncode(new TextEncoder().encode(JSON.stringify(payload)));
  const signingInput = `${h}.${p}`;
  if ((header.alg || 'HS256').toLowerCase() === 'none') return `${signingInput}.`;
  const sig = await window.SecWidgets.jwtSignHs256(signingInput, secret);
  return `${signingInput}.${sig}`;
};

window.SecWidgets.jwtVerify = async function (token, secret) {
  const decoded = window.SecWidgets.jwtDecode(token);
  if ((decoded.header.alg || '').toLowerCase() === 'none') {
    return { valid: false, reason: "alg='none' — server should reject regardless of signature." };
  }
  if (decoded.header.alg !== 'HS256') {
    return { valid: false, reason: `Unsupported alg ${decoded.header.alg}` };
  }
  const expected = await window.SecWidgets.jwtSignHs256(decoded.signingInput, secret);
  return { valid: expected === decoded.signature, reason: expected === decoded.signature ? 'signature matches' : 'signature does NOT match' };
};

class JwtTamper extends HTMLElement {
  connectedCallback() {
    this.secret = 'server-secret';
    this.header = { alg: 'HS256', typ: 'JWT' };
    this.payload = { sub: 'alice', role: 'user' };
    this.classList.add('widget');
    this.render();
    this.rebuild();
  }

  render() {
    const { el } = window.SecWidgets;
    this.innerHTML = '';
    const header = el('div', { class: 'widget-header' }, 'JWT decoder + tamper');

    const left = el('div', { class: 'pane' });
    left.append(el('div', { class: 'pane-title' }, 'Header (JSON)'));
    this.headerTa = el('textarea', { 'aria-label': 'JWT header (JSON)' });
    this.headerTa.value = JSON.stringify(this.header, null, 2);
    left.append(this.headerTa);
    left.append(el('div', { class: 'pane-title', style: 'margin-top: 10px' }, 'Payload (JSON)'));
    this.payloadTa = el('textarea', { 'aria-label': 'JWT payload (JSON)' });
    this.payloadTa.value = JSON.stringify(this.payload, null, 2);
    left.append(this.payloadTa);
    left.append(el('div', { class: 'pane-title', style: 'margin-top: 10px' }, 'Server secret'));
    this.secretInput = el('input', { type: 'text', 'aria-label': 'Server secret for JWT signing' });
    this.secretInput.value = this.secret;
    left.append(this.secretInput);
    const rebuildBtn = el('button', null, 'Rebuild token');
    rebuildBtn.addEventListener('click', () => this.rebuild());
    left.append(rebuildBtn);

    const right = el('div', { class: 'pane' });
    right.append(el('div', { class: 'pane-title' }, 'Token'));
    this.tokenPre = el('pre', { style: 'white-space: pre-wrap; word-break: break-all' }, '');
    right.append(this.tokenPre);
    right.append(el('div', { class: 'pane-title', style: 'margin-top: 10px' }, 'Server verifies with the secret above'));
    this.verdict = el('div', { class: 'verdict muted' }, '…');
    right.append(this.verdict);

    const body = el('div', { class: 'widget-body' }, el('div', { class: 'panes' }, left, right));
    this.append(header, body);
  }

  async rebuild() {
    try {
      this.header = JSON.parse(this.headerTa.value);
      this.payload = JSON.parse(this.payloadTa.value);
    } catch (e) {
      this.verdict.className = 'verdict bad';
      this.verdict.textContent = 'JSON parse error — ' + e.message;
      return;
    }
    const serverSecret = this.secretInput.value;
    const token = await window.SecWidgets.jwtBuild(this.header, this.payload, serverSecret);
    this.tokenPre.textContent = token;

    // Demonstrate tampering: also try verifying the token against the server secret
    // when the user has changed the payload but reused the original signature.
    const result = await window.SecWidgets.jwtVerify(token, serverSecret);
    this.verdict.className = 'verdict ' + (result.valid ? 'ok' : 'bad');
    this.verdict.textContent = (result.valid ? '✓ ' : '✗ ') + result.reason;
  }
}
customElements.define('jwt-tamper', JwtTamper);
