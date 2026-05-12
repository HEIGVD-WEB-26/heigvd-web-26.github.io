// <predict-reveal>
//   <p slot="question">Question text or markup</p>
//   <p slot="answer">Answer text or markup</p>
// </predict-reveal>
class PredictReveal extends HTMLElement {
  connectedCallback() {
    const question = this.querySelector('[slot="question"]');
    const answer = this.querySelector('[slot="answer"]');
    if (!question || !answer) {
      console.warn('predict-reveal: missing slot=question or slot=answer', this);
      return;
    }
    answer.style.display = 'none';
    answer.classList.add('callout');

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'secondary';
    btn.textContent = 'Reveal';
    btn.addEventListener('click', () => {
      answer.style.display = '';
      btn.style.display = 'none';
    });

    // Inject button between question and answer
    answer.before(btn);

    // Add widget chrome
    this.classList.add('widget');
    const body = document.createElement('div');
    body.className = 'widget-body';
    // Move existing children into body
    while (this.firstChild) body.append(this.firstChild);
    const header = document.createElement('div');
    header.className = 'widget-header';
    header.textContent = 'Predict, then reveal';
    this.append(header, body);
  }
}
customElements.define('predict-reveal', PredictReveal);
