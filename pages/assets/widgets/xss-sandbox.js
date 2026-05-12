// Bridge script injected into the sandboxed iframe. Posts a message
// to the parent whenever something that "looks like" XSS executed:
//   - alert/prompt/confirm called
//   - any inline event handler fires (onerror/onload via attached listener)
const XSS_BRIDGE = `
<script>
  (function(){
    function notify(kind, message){
      try { parent.postMessage({ type: 'xss-event', kind, message }, '*'); } catch (e) {}
    }
    const origAlert = window.alert;
    window.alert = function(m){ notify('alert', String(m)); };
    window.prompt = function(m){ notify('prompt', String(m)); return null; };
    window.confirm = function(m){ notify('confirm', String(m)); return false; };
    window.addEventListener('error', function(e){ notify('error', e.message || 'script error'); });
    // Notify when any element load fires (e.g. <img onload>)
    window.addEventListener('DOMContentLoaded', function(){
      document.querySelectorAll('[onload],[onerror]').forEach(function(){ notify('handler', 'inline handler element present'); });
    });
  })();
</script>`;

class XssSandbox extends HTMLElement {
  static get observedAttributes() { return ['template']; }

  connectedCallback() {
    this.template = this.getAttribute('template') || 'reflected';
    this.payload = this.getAttribute('payload') || '<img src=x onerror=alert(1)>';
    this.classList.add('widget');
    this.render();
    window.addEventListener('message', this.onMessage = (e) => {
      if (!e.data || e.data.type !== 'xss-event') return;
      if (e.source !== this.iframe.contentWindow) return;
      this.showVerdict(true, `${e.data.kind}: ${e.data.message}`);
    });
  }

  disconnectedCallback() { window.removeEventListener('message', this.onMessage); }

  buildResponse(payload) {
    // Two templates supported.
    if (this.template === 'attribute') {
      return `<!doctype html><html><body><img src='avatar.png' alt='${payload}'/>${XSS_BRIDGE}</body></html>`;
    }
    // default: reflected element body
    return `<!doctype html><html><body><h1>Hello, ${payload}</h1>${XSS_BRIDGE}</body></html>`;
  }

  render() {
    const { el } = window.SecWidgets;
    this.innerHTML = '';
    const title = this.template === 'attribute' ? 'XSS sandbox — attribute context' : 'XSS sandbox — element body';
    const header = el('div', { class: 'widget-header' }, title);

    const left = el('div', { class: 'pane' });
    left.append(el('div', { class: 'pane-title' }, 'Vulnerable server (read-only)'));
    const serverCode = this.template === 'attribute'
      ? `res.send(\`<img src='avatar.png' alt='\${req.query.user}'/>\`)`
      : `res.send(\`<h1>Hello, \${req.query.user}</h1>\`)`;
    left.append(el('pre', null, serverCode));
    left.append(el('div', { class: 'pane-title', style: 'margin-top:10px' }, 'Your input (?user=)'));
    const ta = el('textarea', { 'aria-label': 'XSS payload (?user= parameter)' });
    ta.value = this.payload;
    left.append(ta);
    const run = el('button', null, 'Run');
    run.addEventListener('click', () => {
      this.payload = ta.value;
      this.showVerdict(null, '');
      this.iframe.srcdoc = this.buildResponse(this.payload);
    });
    left.append(run);

    const right = el('div', { class: 'pane' });
    right.append(el('div', { class: 'pane-title' }, 'Rendered in sandboxed iframe'));
    this.iframe = el('iframe');
    this.iframe.setAttribute('sandbox', 'allow-scripts');
    this.iframe.style.cssText = 'width: 100%; height: 120px; border: 1px solid var(--border); background: white; border-radius: 4px;';
    this.iframe.srcdoc = '<!doctype html><html><body><p style="color:#888;font-family:sans-serif">Press Run to send your payload.</p></body></html>';
    right.append(this.iframe);

    this.verdictBox = el('div', { class: 'verdict muted' }, 'No script activity detected (yet)');
    right.append(this.verdictBox);

    const body = el('div', { class: 'widget-body' }, el('div', { class: 'panes' }, left, right));
    this.append(header, body);
  }

  showVerdict(triggered, msg) {
    if (triggered === null) {
      this.verdictBox.className = 'verdict muted';
      this.verdictBox.textContent = 'Running…';
      return;
    }
    if (triggered) {
      this.verdictBox.className = 'verdict bad';
      this.verdictBox.textContent = 'XSS executed — ' + msg;
    } else {
      this.verdictBox.className = 'verdict ok';
      this.verdictBox.textContent = 'No XSS detected — ' + msg;
    }
  }
}
customElements.define('xss-sandbox', XssSandbox);
