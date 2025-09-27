import { LitElement, html, css } from "lit-element";

import "./irus-tables";

class IrusContent extends LitElement {
  static get styles() {
    return css`
      main {
        padding: 2rem;
      }

      #time {
        width: 100%;
        font-size: 20px;
        color: white;
        margin: 0 43%;
      }
    `;
  }

  static get properties() {
    return {
      page: { type: String },
      time: { type: String },
    };
  }

  constructor() {
    super();
    this.page = "tables";

    setInterval(() => {
      this.time = new Date().toLocaleString("ro");
    }, 1000);
  }

  render() {
    return html`
      <strong id="time">${this.time}</strong>
      <main>
        <irus-tables></irus-tables>
      </main>
    `;
  }

  _onGoBack(event) {
    event.preventDefault();
    window.location.href = "http://localhost:80/#";
  }

  _onChangeMenu(event) {
    this.page = event.target.value;
  }
}

window.customElements.define("irus-content", IrusContent);
