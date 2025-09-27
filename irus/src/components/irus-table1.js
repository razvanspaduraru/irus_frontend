import { LitElement, html, css } from "lit-element";

class IrusTable1 extends LitElement {
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

      #sunrise {
        margin: 0 80%;
        width: 100%;
        padding: 20px;
      }

      #sunset {
        margin: 0 80%;
        width: 100%;
        padding: 20px;
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
    const time = this.timeGeo.split(",")[1];
    console.log(day + "-" + month + "-" + year, time);
    var formdata = new FormData();
    formdata.append("date", year + "-" + month + "-" + day);
    formdata.append("latitude", this.lat);
    formdata.append("longitude", this.lon);
    formdata.append("height", this.elv);
    const response = await fetch("http://localhost:82/sunrise", {
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
      this.content = html`
        <h1 id="sunrise">
          <strong>
            Sunrise at
            ${Math.round(data["UT(RT) - local timezone"][1]) +
              ":" +
              Math.round(data["UT(RT) - local timezone"][2]) || "--"}
          </strong>
        </h1>
        <h1 id="sunset">
          <strong>
            Sunset at
            ${Math.round(data["UT(ST) - local timezone"][2]) +
              ":" +
              Math.round(data["UT(ST) - local timezone"][3]) || "--"}
          </strong>
        </h1>
        <details>
          <summary>
            <strong>SHOW ALGORITHM TABLE</strong>
          </summary>
          <div class="container">
            <fieldset>
              <legend>Input</legend>
              <table>
                <tr>
                  <th>Day</th>
                  <th>Month</th>
                  <th>Year</th>
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
                  <th>Height</th>
                </tr>
                <tr>
                  <td>${this.elv}</td>
                </tr>
              </table>
            </fieldset>
            <br />
            <br />
            <br />
            <fieldset>
              <legend>Calculate the day of the year</legend>
              <table>
                <tr>
                  <th>N1</th>
                  <th>N2</th>
                  <th>N3</th>
                  <th>N</th>
                </tr>
                <tr>
                  <td>${data.N1 || "--"}</td>
                  <td>${data.N2 || "--"}</td>
                  <td>${data.N3 || "--"}</td>
                  <td>${data.N || "--"}</td>
                </tr>
              </table>
            </fieldset>
            <br />
            <br />
            <br />
            <fieldset>
              <legend>(R) = rising, (S) = seting</legend>
              <table>
                <tr>
                  <th>t(RT) / t(ST) = IngHour</th>
                  <th>For rising time = t(RT)</th>
                  <th>For seting time = t(ST)</th>
                </tr>
                <tr>
                  <td>${data["IngHour"] || "--"}</td>
                  <td>${data["t(RT)"] || "--"}</td>
                  <td>${data["t(ST)"] || "--"}</td>
                </tr>
              </table>
            </fieldset>
            <br />
            <br />
            <br />
            <fieldset>
              <legend>Sun's mean anomaly</legend>
              <table>
                <tr>
                  <th>M(RT)</th>
                  <th>M(ST)</th>
                </tr>
                <tr>
                  <td>${data["M(RT)"] || "--"}</td>
                  <td>${data["M(ST)"] || "--"}</td>
                </tr>
              </table>
            </fieldset>
            <br />
            <br />
            <br />
            <fieldset>
              <legend>Sun's true longitude</legend>
              <table>
                <tr>
                  <th>L(RT)</th>
                  <th>L(ST)</th>
                </tr>
                <tr>
                  <td>${data["L(RT)"][0] || "--"}</td>
                  <td>${data["L(ST)"][0] || "--"}</td>
                </tr>
                <tr>
                  <td>${data["L(RT)"][1] || "--"}</td>
                  <td>${data["L(ST)"][1] || "--"}</td>
                </tr>
              </table>
            </fieldset>
            <br />
            <br />
            <br />
            <fieldset>
              <legend>Sun's right ascension</legend>
              <table>
                <tr>
                  <th>RA(RT)</th>
                  <th>RA(ST)</th>
                </tr>
                <tr>
                  <td>${data["RA(RT)"] || "--"}</td>
                  <td>${data["RA(ST)"] || "--"}</td>
                </tr>
              </table>
            </fieldset>
            <br />
            <br />
            <br />
            <fieldset>
              <legend>
                Right ascension value needs to be in the same quadrant as L
              </legend>
              <table>
                <tr>
                  <th>Lquadrant(RT)</th>
                  <th>RAquadrant(RT)</th>
                  <th>RA(RT)</th>
                </tr>
                <tr>
                  <td>${data["Lquadrant(RT)"] || "0"}</td>
                  <td>${data["RAquadrant(RT)"] || "0"}</td>
                  <td>${data["RA(RT) - same quadrant as L"] || "--"}</td>
                </tr>
              </table>
              <table>
                <tr>
                  <th>Lquadrant(ST)</th>
                  <th>RAquadrant(ST)</th>
                  <th>RA(ST)</th>
                </tr>
                <tr>
                  <td>${data["Lquadrant(ST)"] || "0"}</td>
                  <td>${data["RAquadrant(ST)"] || "0"}</td>
                  <td>${data["RA(ST) - same quadrant as L"] || "--"}</td>
                </tr>
              </table>
            </fieldset>
            <br />
            <br />
            <br />
            <fieldset>
              <legend>
                Right ascension value converted into hours
              </legend>
              <table>
                <tr>
                  <th>RA(RT)</th>
                  <th>RA(ST)</th>
                </tr>
                <tr>
                  <td>${data["RA(RT) - hours"] || "--"}</td>
                  <td>${data["RA(ST) - hours"] || "--"}</td>
                </tr>
              </table>
            </fieldset>
            <br />
            <br />
            <br />
            <fieldset>
              <legend>
                Sun's declination
              </legend>
              <table>
                <tr>
                  <th>sinDec(RT)</th>
                  <th>cosDec(RT)</th>
                </tr>
                <tr>
                  <td>${data["sinDec(RT)"] || "--"}</td>
                  <td>${data["cosDec(RT)"] || "--"}</td>
                </tr>
              </table>
              <table>
                <tr>
                  <th>sinDec(ST)</th>
                  <th>cosDec(ST)</th>
                </tr>
                <br />
                <tr>
                  <td>${data["sinDec(ST)"] || "--"}</td>
                  <td>${data["cosDec(ST)"] || "--"}</td>
                </tr>
              </table>
            </fieldset>
            <br />
            <br />
            <br />
            <fieldset>
              <legend>
                Sun's local hour angle
              </legend>
              <table>
                <tr>
                  <th>cosH(RT)</th>
                  <th>cosH(ST)</th>
                </tr>
                <tr>
                  <td>${data["cosH(RT)"] || "--"}</td>
                  <td>${data["cosH(ST)"] || "--"}</td>
                </tr>
              </table>
            </fieldset>
            <br />
            <br />
            <br />
            <fieldset>
              <legend>
                Calculating H and convert into hours
              </legend>
              <table>
                <tr>
                  <th>H(RT)</th>
                  <th>H(ST)</th>
                </tr>
                <tr>
                  <td>${data["H(RT)"][0] || "--"}</td>
                  <td>${data["H(ST)"][0] || "--"}</td>
                </tr>
                <tr>
                  <td>${data["H(RT)"][1] || "--"} (hours)</td>
                  <td>${data["H(ST)"][1] || "--"} (hours)</td>
                </tr>
              </table>
            </fieldset>
            <br />
            <br />
            <br />
            <fieldset>
              <legend>
                Sun's local hour angle
              </legend>
              <table>
                <tr>
                  <th>T(RT)</th>
                  <th>T(ST)</th>
                </tr>
                <tr>
                  <td>${data["T(RT)"] || "--"}</td>
                  <td>${data["T(ST)"] || "--"}</td>
                </tr>
              </table>
            </fieldset>
            <br />
            <br />
            <br />
            <fieldset>
              <legend>
                Adjust back to UTC (maybe need to add/substract 24h)
              </legend>
              <table>
                <tr>
                  <th>T(RT)</th>
                  <th>T(ST)</th>
                </tr>
                <tr>
                  <td>${data["UT(RT)"][0] || "--"}</td>
                  <td>${data["UT(ST)"][0] || "--"}</td>
                </tr>

                <tr>
                  <td>${data["UT(RT)"][1] || "--"}</td>
                  <td>${data["UT(ST)"][1] || "--"}</td>
                </tr>
              </table>
            </fieldset>
            <br />
            <br />
            <br />
            <fieldset>
              <legend>
                Convert UT value to local time zone of latitude/longitude
              </legend>
              <table>
                <tr>
                  <th>Sunrise</th>
                  <th>Sunset</th>
                </tr>
                <tr>
                  <td>
                    ${Math.round(data["UT(RT) - local timezone"][1]) +
                      ":" +
                      Math.round(data["UT(RT) - local timezone"][2]) || "--"}
                  </td>
                  <td>
                    ${Math.round(data["UT(ST) - local timezone"][2]) +
                      ":" +
                      Math.round(data["UT(ST) - local timezone"][3]) || "--"}
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

window.customElements.define("irus-table-one", IrusTable1);
