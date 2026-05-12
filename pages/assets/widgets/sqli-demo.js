// Toy SQL "database" and a deliberately permissive matcher.
window.SecWidgets.sqliDb = [
  { name: 'admin', pass: 'correct-horse-battery-staple', role: 'admin' },
  { name: 'alice', pass: 'hunter2', role: 'user' },
  { name: 'bob',   pass: 'p4ssw0rd', role: 'user' },
];

// Build the SQL string a vulnerable app would build.
window.SecWidgets.sqliBuild = function (user, pass) {
  return `SELECT * FROM users WHERE name = '${user}' AND pass = '${pass}'`;
};

// Toy executor. Understands:
//   WHERE x = 'literal' [AND x = 'literal']*
//   --  line comment (everything after is ignored)
//   '... ' OR '...'... (any clause that evaluates to a constant truthy "1=1" pattern)
// This is NOT a real SQL engine — it's enough to demonstrate the classic injections.
window.SecWidgets.sqliExec = function (sql) {
  const rows = window.SecWidgets.sqliDb;
  // Strip line comments (-- ...)
  const noComments = sql.replace(/--.*$/m, '');
  // Pull out the WHERE clause if any
  const m = noComments.match(/WHERE\s+(.+)$/i);
  if (!m) return rows.slice();
  const where = m[1].trim();
  // Tautology detection: 1=1, '1'='1', 'a'='a', OR 1=1, OR ''=''
  if (/\bOR\b\s*(['"]?)(\w*)\1\s*=\s*\1\2\1/i.test(where) || /\bOR\b\s*1\s*=\s*1/i.test(where)) {
    return rows.slice(); // all rows match
  }
  // Otherwise parse "a = 'x' AND b = 'y'" form
  const clauses = where.split(/\bAND\b/i).map(s => s.trim()).filter(Boolean);
  return rows.filter(row => clauses.every(c => {
    const cm = c.match(/^(\w+)\s*=\s*'([^']*)'$/);
    if (!cm) return false;
    return row[cm[1]] === cm[2];
  }));
};

class SqliDemo extends HTMLElement {
  connectedCallback() {
    this.user = "admin' --";
    this.pass = 'anything';
    this.classList.add('widget');
    this.render();
  }

  render() {
    const { el } = window.SecWidgets;
    this.innerHTML = '';
    const header = el('div', { class: 'widget-header' }, 'SQL injection on a fake login');

    const left = el('div', { class: 'pane' });
    left.append(el('div', { class: 'pane-title' }, 'Vulnerable handler'));
    left.append(el('pre', null, `db.query(\`SELECT * FROM users\n  WHERE name = '\${user}'\n  AND pass = '\${pass}'\``));
    left.append(el('div', { class: 'pane-title', style: 'margin-top: 10px' }, 'Try a login'));
    const userInput = el('input', { type: 'text', 'aria-label': 'Username' });
    userInput.value = this.user;
    userInput.placeholder = 'username';
    const passInput = el('input', { type: 'text', style: 'margin-top: 6px', 'aria-label': 'Password' });
    passInput.value = this.pass;
    passInput.placeholder = 'password';
    left.append(userInput, passInput);
    const btn = el('button', null, 'Login');
    left.append(btn);

    const right = el('div', { class: 'pane' });
    right.append(el('div', { class: 'pane-title' }, 'Resolved query'));
    const queryPre = el('pre', null, '');
    right.append(queryPre);
    const verdict = el('div', { class: 'verdict muted' }, 'No login attempted yet.');
    right.append(verdict);

    btn.addEventListener('click', () => {
      this.user = userInput.value;
      this.pass = passInput.value;
      const sql = window.SecWidgets.sqliBuild(this.user, this.pass);
      queryPre.textContent = sql;
      const rows = window.SecWidgets.sqliExec(sql);
      if (rows.length === 0) {
        verdict.className = 'verdict bad';
        verdict.textContent = 'Login failed (no rows matched).';
      } else if (rows.length === 1) {
        verdict.className = 'verdict ok';
        verdict.textContent = `Logged in as ${rows[0].name} (role: ${rows[0].role}).`;
      } else {
        verdict.className = 'verdict bad';
        verdict.textContent = `Bypassed — ${rows.length} rows match (first: ${rows[0].name}, role: ${rows[0].role}).`;
      }
    });

    const body = el('div', { class: 'widget-body' }, el('div', { class: 'panes' }, left, right));
    this.append(header, body);
  }
}
customElements.define('sqli-demo', SqliDemo);
