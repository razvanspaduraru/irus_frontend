import { LitElement, html, css } from "lit-element";

export class IrusForm extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 2rem;
        height: 5rem;
      }
      .form-log {
        margin: auto;
        width: 30%;
        padding: 10px;
      }
      input[type="text"] {
        width: 100%;
        padding: 10px 20px;
        margin: 8px 0;
        font-size: 15px;
        background-color: white;
        box-sizing: border-box;
        border: 3px solid #000080;
        -webkit-transition: 0.5s;
        transition: 0.5s;
        outline: none;
        font-family: "Comic Sans MS", cursive, sans-serif;
      }

      ::placeholder {
        color: #000080;
      }

      h1 {
        font-size: 30px;
        padding-bottom: 20px;
        color: white;
        margin: 0 5%;
        width: 100%;
      }

      input[type="text"]:focus {
        border: 3px solid #555;
      }

      div {
        margin: 0 auto;
        border-radius: 5px;
        background: #7f7f7f;
        background: rgba(0, 0, 0, 0.8);
        padding: 20px;
        width: 50%;
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
          0 6px 20px 0 rgba(0, 0, 0, 0.19);
      }

      label {
        color: #000080;
        font-size: 22px;
        padding: 8px;
        font-family: "Comic Sans MS", cursive, sans-serif;
      }

      button {
        background-color: white;
        color: #000080;
        padding: 12px 22px;
        border: 2px solid #000080;
        font-family: "Comic Sans MS", cursive, sans-serif;
        margin: 0 20%;
      }
      button:hover {
        background-color: #000080;
        color: white;
      }

      .clearfix2 {
        margin: 0 100%;
      }
    `;
  }

  render() {
    return html`
      <div class="center">
        <form class="form-log" @submit=${this._onSubmit}>
          <h1>Route on map</h1>
          <p class="clearfix">
            <input type="text" id="source" name="source" placeholder="Source" />
          </p>
          <p class="clearfix">
            <input
              type="text"
              id="dest"
              name="dest"
              placeholder="Destination"
            />
          </p>
          <p class="clearfix">
            <button type="submit" name="submit">NAVIGATE</button>
          </p>
        </form>
        <strong style="color: white">
          Copyright &copy; Bogdan-Cristian Firuti and Razvan-Stefan Paduraru
        </strong>
      </div>
    `;
  }

  _onSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const way = Object.fromEntries(data);
    localStorage.src = way.source;
    localStorage.dst = way.dest;
    this.dispatchEvent(new CustomEvent("navigate-pressed"));
  }
}

window.customElements.define("irus-form", IrusForm);
