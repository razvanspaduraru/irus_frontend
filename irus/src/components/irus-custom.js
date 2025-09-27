import { LitElement, html, css } from "lit-element";

class IrusCustom extends LitElement {
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
        margin: 0 0;
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
        margin: 0 24%;
      }
      button:hover {
        background-color: #000080;
        color: white;
      }

      .clearfix2 {
        margin: 0 100%;
      }

      select {
        font-size: 18px;
        padding: 14px 18px;
        border-radius: 4px;
        background-color: white;
        color: black;
        font-family: "Comic Sans MS", cursive, sans-serif;
      }

      section {
        display: flex;
        justify-content: space-between;
      }

      main {
        padding: 2rem;
      }
    `;
  }

  static get properties() {
    return {
      page: { type: String },
      content: { type: String },
      lat: { type: String },
      lon: { type: String },
      elv: { type: String },
      timeGeo: { type: String },
    };
  }

  constructor() {
    super();
    this.page = "Table1";
    this.content = html``;
  }

  render() {
    return html`
      <div class="center">
        <form class="form-log" @submit=${this._onSubmit}>
          <h1>Custom Information</h1>
          <p class="clearfix">
            <input
              type="text"
              id="latitude"
              name="latitude"
              placeholder="Latitude"
            />
          </p>
          <p class="clearfix">
            <input
              type="text"
              id="longitude"
              name="longitude"
              placeholder="Longitude"
            />
          </p>
          <p class="clearfix">
            <input
              type="text"
              id="date"
              name="date"
              placeholder="DAY.MONTH.YEAR"
            />
          </p>
          <p class="clearfix">
            <input
              type="text"
              id="hour"
              name="hour"
              placeholder="HOUR:MINUTE:SECOND"
            />
          </p>
          <p class="clearfix">
            <button type="submit" name="submit">SEARCH</button>
          </p>
        </form>
        <strong id="copy" style="color: white">
          Copyright &copy; Bogdan-Cristian Firuti and Razvan-Stefan Paduraru
        </strong>
      </div>
      <br />
      <br />
      <br />
      ${this.content}
    `;
  }

  async _onSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const coords = Object.fromEntries(data);
    this.lat = coords.latitude;
    this.lon = coords.longitude;
    this.timeGeo = coords.date + ", " + coords.hour;
    const baseElevation =
      "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/elevation/json?locations=" +
      `${this.lat}` +
      "," +
      `${this.lon}` +
      "&key=${api-key}";
    const resultElevation = await fetch(`${baseElevation}`);
    const dataElevation = await resultElevation.json();
    this.elv = dataElevation.results[0].elevation;
    this.content = html`<section>
        <nav>
          <select @change=${this._onChangeMenu} name="Table Type">
            <option ?selected=${this.page === "Table1"} value="Table1"
              >Sunrise and Sunset Algorithm at height H</option
            >
            <option ?selected=${this.page === "Table2"} value="Table2"
              >Civil Twilight Algorithm</option
            >
            <option ?selected=${this.page === "Table3"} value="Table3"
              >Azimuth and Altitude (zenithal distance)</option
            >
          </select>
        </nav>
      </section>

      <main>
        ${this._pageTemplate}
      </main>`;
  }

  _onChangeMenu(event) {
    this.page = event.target.value;
    console.log(this.page);
    this.content = html`<section>
        <nav>
          <select @change=${this._onChangeMenu} name="Table Type">
            <option ?selected=${this.page === "Table1"} value="Table1"
              >Sunrise and Sunset Algorithm at height H</option
            >
            <option ?selected=${this.page === "Table2"} value="Table2"
              >Civil Twilight Algorithm</option
            >
            <option ?selected=${this.page === "Table3"} value="Table3"
              >Azimuth and Altitude (zenithal distance)</option
            >
          </select>
        </nav>
      </section>

      <main>
        ${this._pageTemplate}
      </main>`;
  }

  get _pageTemplate() {
    if (this.page === "Table1") {
      return html`<irus-table-one
        .lat=${this.lat}
        .lon=${this.lon}
        .elv=${this.elv}
        .timeGeo=${this.timeGeo}
      ></irus-table-one>`;
    }
    if (this.page === "Table2") {
      return html`<irus-table-two
        .lat=${this.lat}
        .lon=${this.lon}
        .elv=${this.elv}
        .timeGeo=${this.timeGeo}
      ></irus-table-two>`;
    }
    if (this.page === "Table3") {
      return html`<irus-table-three
        .lat=${this.lat}
        .lon=${this.lon}
        .elv=${this.elv}
        .timeGeo=${this.timeGeo}
      ></irus-table-three>`;
    }
  }
}

window.customElements.define("irus-custom", IrusCustom);
