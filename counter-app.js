import { LitElement, html, css } from 'lit';

export class CounterApp extends LitElement {
  static get properties() {
    return {
      counter: { type: Number, reflect: true },
      min: { type: Number, reflect: true },
      max: { type: Number, reflect: true },
    };
  }

  constructor() {
    super();
    // Set default values
    this.counter = 0;
    this.min = 0;
    this.max = 100;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        padding: 16px;
        font-family: var(--counter-app-font-family, sans-serif);
      }

      .counter-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
      }

      .counter-number {
        font-size: var(--counter-app-number-size, 3rem);
        font-weight: bold;
        transition: color 0.3s ease;
      }

      .counter-number.min,
      .counter-number.max {
        color: var(--counter-app-limit-color, #ff4d4d);
      }

      .counter-number.special-18 {
        color: var(--counter-app-special-18-color, #4d94ff);
      }

      .counter-number.special-21 {
        color: var(--counter-app-special-21-color, #9c27b0);
      }

      .buttons {
        display: flex;
        gap: 8px;
      }

      button {
        background-color: var(--counter-app-button-color, #4285f4);
        color: white;
        border: none;
        border-radius: 4px;
        padding: 8px 16px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s ease, opacity 0.3s ease;
      }

      button:hover:not([disabled]) {
        background-color: var(--counter-app-button-hover-color, #2b76e5);
      }

      button:focus {
        outline: 2px solid var(--counter-app-focus-color, #2b76e5);
        outline-offset: 2px;
      }

      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `;
  }

  increment() {
    if (this.counter < this.max) {
      this.counter++;
    }
  }

  decrement() {
    if (this.counter > this.min) {
      this.counter--;
    }
  }

  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    if (changedProperties.has('counter')) {
      // Check if counter reaches 21 to make it rain confetti
      if (this.counter === 21) {
        this.makeItRain();
      }
    }
  }

  makeItRain() {
    // Dynamic import for the confetti effect
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        setTimeout(() => {
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }

  render() {
    // Determine the CSS class for the counter based on its value
    let counterClass = 'counter-number';
    if (this.counter === this.min) {
      counterClass += ' min';
    } else if (this.counter === this.max) {
      counterClass += ' max';
    } else if (this.counter === 18) {
      counterClass += ' special-18';
    } else if (this.counter === 21) {
      counterClass += ' special-21';
    }

    return html`
      <confetti-container id="confetti">
        <div class="counter-container">
          <div class="${counterClass}">${this.counter}</div>
          <div class="buttons">
            <button 
              @click="${this.decrement}" 
              ?disabled="${this.counter === this.min}"
            >
              -
            </button>
            <button 
              @click="${this.increment}" 
              ?disabled="${this.counter === this.max}"
            >
              +
            </button>
          </div>
        </div>
      </confetti-container>
    `;
  }
}

customElements.define('counter-app', CounterApp);