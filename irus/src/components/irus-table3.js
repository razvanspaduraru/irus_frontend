import { LitElement, html, css } from "lit-element";

class IrusTable3 extends LitElement {
  static get styles() {
    return css`
      strong {
        color: white;
        font-size: 30px;
      }
      div {
        display: flex;
        flex-wrap: wrap;
        border-radius: 5px;
        background: #7f7f7f;
        background: rgba(0, 0, 0, 0.8);
        padding: 20px;
        width: fit-content;
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
          0 6px 20px 0 rgba(0, 0, 0, 0.19);
      }

      h1 {
        margin: 0 35%;
        width: 100%;
        padding: 20px;
      }

      summary {
        background: #7f7f7f;
        width: fit-content;
        background: rgba(0, 0, 0, 0.8);
        padding: 10px;
      }

      summary::-webkit-details-marker {
        color: white;
        font-size: 25px;
      }

      legend {
        color: white;
        width: fit-content;
        padding: 8px;
        font-size: 30px;
        border-radius: 5px;
      }

      fieldset {
        padding: 20px;
        width: 100%;
        border-radius: 10px white;
        color: white;
        margin: 0 20%;
      }

      p {
        margin: 0 5%;
        font-size: 20px;
      }

      table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
      }

      td,
      th {
        border: 1px solid;
        text-align: center;
        padding: 8px;
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
      content: { type: String },
    };
  }

  constructor() {
    super();
    this.content = "";
  }

  async getData() {
    var formdata = new FormData();
    const date = this.timeGeo.split(",")[0];
    const day = date.split(".")[0];
    const month = date.split(".")[1];
    const year = date.split(".")[2];
    const time = this.timeGeo.split(",")[1].split(" ")[1];
    console.log(day + "-" + month + "-" + year, time);
    formdata.append("date", year + "-" + month + "-" + day);
    formdata.append("time", time);
    formdata.append("latitude", this.lat);
    formdata.append("longitude", this.lon);
    formdata.append("height", this.elv);

    console.log(formdata);
    const response = await fetch("http://localhost:82/azimuth", {
      method: "POST",
      body: formdata,
      redirect: "follow",
    });

    if (response.ok) {
      const data = await response.json();
      const date = this.timeGeo.split(",")[0];
      const day = date.split(".")[0];
      const month = date.split(".")[1];
      const year = date.split(".")[2];
      const time = this.timeGeo.split(",")[1];

      this.content = html`
        <details>
          <summary>
            <strong>SHOW ALGORITHM TABLE</strong>
          </summary>
          <div class="container">
            <fieldset>
              <legend>Input</legend>
              <table>
                <tr>
                  <th>Day (D)</th>
                  <th>Month (M)</th>
                  <th>Year (Y)</th>
                </tr>
                <tr>
                  <td>${day}</td>
                  <td>${month}</td>
                  <td>${year}</td>
                </tr>
              </table>
              <br />
              <br />
              <br />
              <table>
                <tr>
                  <th>Univeral Time (UT)</th>
                  <th>
                    Latitude of Observer (north is positive and south is
                    negative)
                  </th>
                  <th>
                    Local Longitude in degrees (east is positive and west is
                    negative)
                  </th>
                </tr>
                <tr>
                  <td>${time}</td>
                  <td>${this.lat}</td>
                  <td>${this.lon}</td>
                </tr>
              </table>
            </fieldset>
            <br />
            <br />
            <br />
            <fieldset>
              <legend>Data</legend>
              <table>
                <tr>
                  <th>L (remove multiple of 360)</th>
                  <th>G</th>
                  <th>E</th>
                </tr>
                <tr>
                  <td>${data.L[0] || "--"}</td>
                  <td>${data.G[0] || "--"}</td>
                  <td>${data.E[0] || "--"}</td>
                </tr>
                <tr>
                  <td>${data.L[1] || "--"}</td>
                  <td>${data.G[1] || "--"}</td>
                  <td>${data.E[1] || "--"}</td>
                </tr>
              </table>
              <br />
              <br />
              <br />
              <table>
                <tr>
                  <th>Julian Date (JD)</th>
                  <th>T</th>
                  <th>Lambda</th>
                  <th>Epsilon</th>
                  <th>Greenwich hour angle in degrees (GHA)</th>
                  <th>
                    Delta (declination of body; north is positive and south is
                    negative)
                  </th>
                  <th>SD</th>
                </tr>
                <tr>
                  <td>${data.JD || "--"}</td>
                  <td>${data.T || "--"}</td>
                  <td>${data.lambda || "--"}</td>
                  <td>${data.epsilon || "--"}</td>
                  <td>${data.GHA || "--"}</td>
                  <td>${data.delta || "--"}</td>
                  <td>${data.SD || "--"}</td>
                </tr>
              </table>
            </fieldset>
            <br />
            <br />
            <br />
            <fieldset>
              <legend>Local hour of body in degrees</legend>
              <table>
                <tr>
                  <th>LHA (local hour of body in degrees)</th>
                  <th>LHA >= 0</th>
                  <th>LHA <= 180</th>
                  <th>LHA >= 180</th>
                  <th>LHA <= 360</th>
                </tr>
                <tr>
                  <td>${data.LHA || "--"}</td>
                  <td>${data["LHA >= 0"] || "false"}</td>
                  <td>${data["LHA <= 180"] || "false"}</td>
                  <td>${data["LHA >= 180"] || "false"}</td>
                  <td>${data["LHA <= 360"] || "false"}</td>
                </tr>
              </table>
            </fieldset>
            <br />
            <br />
            <br />
            <fieldset>
              <legend>Altitude - zenithal distance</legend>
              <table>
                <tr>
                  <th>sin a</th>
                  <th>A</th>
                  <th>x = tan A (tan of Azimuth)</th>
                </tr>
                <tr>
                  <td>${data["sin a"] || "--"}</td>
                  <td>${data.a[0] || "--"}</td>
                  <td>${data["x = tan A"] || "--"}</td>
                </tr>
                <tr>
                  <td>"--"</td>
                  <td>${data.a[1] || "--"}</td>
                  <td>"--"</td>
                </tr>
              </table>
            </fieldset>
            <br />
            <br />
            <br />
            <fieldset>
              <legend>
                Azimuth of body measured eastward from north over the range
                0°<=A<=360°
              </legend>
              <table>
                <tr>
                  <th style="color: green">x > 0</th>
                  <th style="color: green">x < 0</th>
                  <th style="color: blue">x > 0</th>
                  <th style="color: blue">x < 0</th>
                </tr>
                <tr>
                  <td style="color: green">
                    ${data["x > 0 (green)"][0] || "false"}
                  </td>
                  <td style="color: green">
                    ${data["x < 0 (green)"][0] || "--"}
                  </td>
                  <td style="color: blue">
                    ${data["x > 0 (blue)"][0] || "--"}
                  </td>
                  <td style="color: blue">
                    ${data["x > 0 (blue)"][0] || "--"}
                  </td>
                </tr>
                <tr>
                  <td style="color: green">
                    ${data["x > 0 (green)"][1] || "--"}
                  </td>
                  <td style="color: green">
                    ${data["x < 0 (green)"][1] || "--"}
                  </td>
                  <td style="color: blue">
                    ${data["x > 0 (blue)"][1] || "--"}
                  </td>
                  <td style="color: blue">
                    ${data["x < 0 (blue)"][1] || "--"}
                  </td>
                </tr>
              </table>
            </fieldset>
          </div>
        </details>
      `;
    }
  }

  render() {
    console.log(this.lat, this.lon, this.elv, this.timeGeo);

    if (this.content === "") this.getData();

    return this.content;
  }
}

window.customElements.define("irus-table-three", IrusTable3);
