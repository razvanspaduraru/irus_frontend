import { LitElement, html, css } from "lit-element";

import "./irus-table1";
import "./irus-table2";
import "./irus-table3";

class IrusTables extends LitElement {
  static get styles() {
    return css`
      select {
        font-size: 18px;
        padding: 14px 18px;
        border-radius: 4px;
        background-color: white;
        color: black;
        font-family: "Comic Sans MS", cursive, sans-serif;
      }

      strong {
        color: white;
        font-size: 30px;
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
      lat: { type: String },
      lon: { type: String },
      elv: { type: String },
      timeGeo: { type: String },
    };
  }

  constructor() {
    super();
    this.page = "Table1";
    this.lat = "";
    this.lon = "";
    this.elv = "";
    this.timeGeo = "";

    navigator.geolocation.getCurrentPosition(
      this._onGeoSuccess.bind(this),
      this._onGeoError
    );
  }

  async getData(position) {
    this.lat = position.coords.latitude;
    this.lon = position.coords.longitude;
    this.timeGeo = new Date().toLocaleString("ro");
    const baseElevation =
      "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/elevation/json?locations=" +
      `${this.lat}` +
      "," +
      `${this.lon}` +
      "&key=AIzaSyBmdRgK-jwYAc8pA3BVp-7evgxTmjGLjBw";
    const resultElevation = await fetch(`${baseElevation}`);
    const dataElevation = await resultElevation.json();
    this.elv = dataElevation.results[0].elevation;
  }

  _onGeoSuccess(position) {
    this.getData(position);
    console.log(this.lat, this.lon, this.elv, this.timeGeo);
  }

  _onGeoError() {
    alert("Unable to retrieve current location");
  }

  render() {
    return html`
      <section>
        <strong>Day/Night application</strong>
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
      </main>
    `;
  }

  _onChangeMenu(event) {
    this.page = event.target.value;
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

window.customElements.define("irus-tables", IrusTables);
