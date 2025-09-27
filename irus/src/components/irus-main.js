import { LitElement, html, css } from "lit-element";

import "./irus-content";
import "./irus-form";
import "./irus-custom";

class IrusMain extends LitElement {
  static get styles() {
    return css`
      header {
        color: white;
        display: flex;
        justify-content: space-between;
        padding: 2rem;
        margin: 0 30%;
        font-size: 30px;
      }

      select {
        width: 100%;
        font-size: 18px;
        padding: 14px 18px;
        border-radius: 4px;
        background-color: white;
        color: black;
        font-family: "Comic Sans MS", cursive, sans-serif;
        margin: 0 -20%;
      }

      main {
        padding: 2rem;
      }
    `;
  }

  static get properties() {
    return {
      page: { type: String },
      time: { type: String },
    };
  }
  static get properties() {
    return {
      page: { type: String },
    };
  }

  constructor() {
    super();
    this.page = window.location.hash.substring(1);
    window.onhashchange = this._onHashChange.bind(this);
  }

  render() {
    return html`
      <header>
        <strong>I.R.U.S.</strong>
        <nav>
          <select @change=${this._onChangeMenu} name="Information Type">
            <option value="">Map</option>

            <option ?selected=${this.page === "content"} value="content"
              >Day/Night application</option
            >
            <option ?selected=${this.page === "custom"} value="custom"
              >Custom</option
            >
            <option ?selected=${this.page === "customMap"} value="customMap"
              >Custom on map</option
            >
          </select>
        </nav>
      </header>
      <main>
        ${this._pageTemplate}
      </main>
    `;
  }

  _onChangeMenu(event) {
    window.location.hash = event.target.value;
  }

  _onHashChange(event) {
    const hash = new URL(event.newURL).hash;
    this.page = hash.substring(1);
  }

  get _pageTemplate() {
    if (this.page === "") {
      return html`<irus-form
        @navigate-pressed=${this._onNavigatePressed}
      ></irus-form>`;
    }
    if (this.page === "content") {
      return html`<irus-content></irus-content>`;
    }

    if (this.page === "custom") {
      return html`<irus-custom></irus-custom>`;
    }

    if (this.page === "customMap") {
      window.location.href = "costumCoords.html";
    }
  }

  _onNavigatePressed(event) {
    event.preventDefault();
    window.location.href = "map.html";
  }
}

window.customElements.define("irus-main", IrusMain);
