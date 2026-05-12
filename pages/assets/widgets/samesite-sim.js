// Decision function — pure, testable.
// state: { secure: bool, sameSite: 'Strict'|'Lax'|'None', scenario: string, isHttps: bool }
// Returns: { sent: bool, reason: string }
window.SecWidgets.samesiteDecide = function (state) {
  const { secure, sameSite, scenario, isHttps } = state;

  // Secure attribute: cookie only sent over HTTPS.
  if (secure && !isHttps) {
    return { sent: false, reason: 'Cookie has Secure attribute; request is over plain HTTP.' };
  }

  switch (scenario) {
    case 'same-origin-fetch':
      return { sent: true, reason: 'Same-origin request — SameSite never blocks these.' };

    case 'top-level-get':
      // Cross-site top-level GET (user clicks a link or types URL)
      if (sameSite === 'Strict') return { sent: false, reason: 'SameSite=Strict blocks cross-site top-level navigations.' };
      return { sent: true, reason: 'SameSite=Lax (default) and None allow top-level GET cross-site.' };

    case 'cross-origin-form-post':
      // Classic CSRF target
      if (sameSite === 'None') return { sent: true, reason: 'SameSite=None sends the cookie on cross-site POST. CSRF surface!' };
      return { sent: false, reason: `SameSite=${sameSite} blocks cross-site POST. Modern default closes naked CSRF.` };

    case 'cross-origin-fetch-credentials':
      if (sameSite === 'None') return { sent: true, reason: 'SameSite=None + credentials:include sends the cookie. Server must also allow it via CORS.' };
      return { sent: false, reason: `SameSite=${sameSite} blocks cross-origin fetch.` };

    default:
      return { sent: false, reason: 'Unknown scenario.' };
  }
};

class SameSiteSim extends HTMLElement {
  connectedCallback() {
    this.classList.add('widget');
    this.state = { secure: true, sameSite: 'Lax', scenario: 'cross-origin-form-post', isHttps: true };
    this.render();
  }

  render() {
    const { el } = window.SecWidgets;
    this.innerHTML = '';

    const header = el('div', { class: 'widget-header' }, 'SameSite simulator');
    const body = el('div', { class: 'widget-body' });

    const config = el('div', { class: 'pane' });
    config.append(el('div', { class: 'pane-title' }, 'Cookie attributes'));
    config.append(this.makeToggleGroup('Secure', ['on', 'off'], this.state.secure ? 'on' : 'off',
      v => { this.state.secure = v === 'on'; this.render(); }));
    config.append(el('div', { style: 'height: 8px' }));
    config.append(el('div', null, 'SameSite = '));
    config.append(this.makeToggleGroup('samesite', ['Strict', 'Lax', 'None'], this.state.sameSite,
      v => { this.state.sameSite = v; this.render(); }));
    config.append(el('div', { style: 'height: 14px' }));
    config.append(el('div', { class: 'pane-title' }, 'Request scenario'));
    config.append(this.makeScenarioGroup());
    config.append(el('div', { style: 'height: 14px' }));
    config.append(el('div', { class: 'pane-title' }, 'Transport'));
    config.append(this.makeToggleGroup('transport', ['https', 'http'], this.state.isHttps ? 'https' : 'http',
      v => { this.state.isHttps = v === 'https'; this.render(); }));

    const result = el('div', { class: 'pane' });
    result.append(el('div', { class: 'pane-title' }, 'Outgoing request'));
    result.append(el('pre', null, this.requestPreview()));
    const decision = window.SecWidgets.samesiteDecide(this.state);
    const isCrossSite = this.state.scenario !== 'same-origin-fetch';
    let kind;
    if (!decision.sent) {
      // Cookie blocked: good for cross-site (CSRF defense), neutral for same-origin (would be a bug)
      kind = isCrossSite ? 'ok' : 'bad';
    } else {
      // Cookie sent: fine for same-origin, ATTACK SURFACE for cross-site
      kind = isCrossSite ? 'bad' : 'ok';
    }
    result.append(window.SecWidgets.verdict(
      (decision.sent ? 'Cookie SENT — ' : 'Cookie BLOCKED — ') + decision.reason,
      kind));

    const panes = el('div', { class: 'panes' }, config, result);
    body.append(panes);
    this.append(header, body);
  }

  makeToggleGroup(name, options, current, onChange) {
    const { el } = window.SecWidgets;
    const wrap = el('div');
    for (const opt of options) {
      wrap.append(el('span', {
        class: 'toggle' + (current === opt ? ' on' : ''),
        onclick: () => onChange(opt),
      }, opt));
    }
    return wrap;
  }

  makeScenarioGroup() {
    const scenarios = [
      ['same-origin-fetch',           'same-origin fetch'],
      ['top-level-get',               'top-level GET nav'],
      ['cross-origin-form-post',      'cross-site form POST'],
      ['cross-origin-fetch-credentials', 'cross-origin fetch+credentials'],
    ];
    const { el } = window.SecWidgets;
    const wrap = el('div');
    for (const [value, label] of scenarios) {
      wrap.append(el('span', {
        class: 'toggle' + (this.state.scenario === value ? ' on' : ''),
        onclick: () => { this.state.scenario = value; this.render(); },
      }, label));
    }
    return wrap;
  }

  requestPreview() {
    const verbByScenario = {
      'same-origin-fetch': 'GET',
      'top-level-get': 'GET',
      'cross-origin-form-post': 'POST',
      'cross-origin-fetch-credentials': 'GET',
    };
    const verb = verbByScenario[this.state.scenario] || 'GET';
    const protocol = this.state.isHttps ? 'https' : 'http';
    return `${verb} ${protocol}://bank.com/transfer\nHost: bank.com\nOrigin: ${this.state.scenario.startsWith('same-') ? 'https://bank.com' : 'https://evil.com'}`;
  }
}
customElements.define('samesite-sim', SameSiteSim);
