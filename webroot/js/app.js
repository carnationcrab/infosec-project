// TODO add languages

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      by: "",
      error: "",
      countryInfo: "",
    };
  }

  submit(event) {
    event.preventDefault();

    // if state is empty (no search params, set an error)
    // consider having requirement/errors as part of form
    if (this.state.keyword == "" || this.state.by == "") {
      return this.setState({ error: "Missing search criteria." });
    } else {
      this.setState({ error: "" });
    }

    console.log(this.state);

    const url =
      "/api/index.php" +
      "?keyword=" +
      this.state.keyword +
      "&by=" +
      this.state.by;

    console.log(url);

    fetch(url)
      .then((res) => {
        if (res.status !== 200) {
          console.log("error bad response");
          this.setState({
            countryInfo: "",
            error: "Error:" + res.status,
          });
        } else {
          res
            .json()
            .then((resJson) => {
              console.log("res", resJson);
              console.log("no error");
              this.setState({ countryInfo: resJson[0], error: "" });
            })
            .catch((err) => {
              console.log("error parsing");
              this.setState({
                countryInfo: "",
                error: "Error: Nothing Found.",
              });
            });
        }
      })
      .catch((err) => {
        this.setState({
          countryInfo: [],
          error: "Error " + err,
        });
        console.log("error");
      });
    console.log("poststate", this.state);
  }

  countTotals() {
    let totalCountries = this.state.countryInfo.length;

    // counts how many are in each region
    let regions = {};
    let subregions = {};

    for (var i = 0; i < this.state.countryInfo.length; i++) {
      let region = this.state.countryInfo[i].region;
      regions[region] = regions[region] ? regions[region] + 1 : 1;

      let subregion = this.state.countryInfo[i].subregion;
      subregions[subregion] = subregions[subregion]
        ? subregions[subregion] + 1
        : 1;
    }

    // counts how many are in each subregion
    // for (var i = 0; i < subregions.length; i++) {
    //   let subregion = subregions[i];
    //   subregionCounts[subregion] = subregionCounts[subregion]
    //     ? subregionCounts[subregion] + 1
    //     : 1;
    // }

    return (
      //   <div>
      //     <h2>
      //       Total Countries: <span>{totalCountries}</span>
      //     </h2>
      //     <h3>Regions:</h3>
      //     {Object.keys(regions).map((region, i) => (
      //       <div>
      //         <h4>{region}</h4>
      //         <li>Count: {regions[region]}</li>
      //       </div>
      //     ))}
      //     <h3>Sub-Regions:</h3>
      //     {Object.keys(subregions).map((subregion, i) => (
      //       <div>
      //         <h4>{subregion}</h4>
      //         <li>Count: {subregions[subregion]}</li>
      //       </div>
      //     ))}
      //   </div>
      <div class="row">
        <div class="col s12">
          <div class="card">
            <div class="card-content">
              <span class="card-title">Search Stats</span>
              <h6>
                Total Countries: <span>{totalCountries}</span>
              </h6>
              <h6>Regions:</h6>
              {Object.keys(regions).map((region, i) => (
                <div class="chip">
                  {region} (Count: {regions[region]})
                </div>
              ))}
              <h6>Sub-Regions:</h6>
              {Object.keys(subregions).map((subregion, i) => (
                <div class="chip">
                  {subregion} (Count: {subregions[subregion]})
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div class="card-panel">
        <h1>Country App</h1>

        <div class="row">
          <div class="col s12">
            <div class="card">
              <div class="card-content">
                <span class="card-title">Search</span>
                <form onSubmit={(event) => this.submit(event)}>
                  <div class="row">
                    <div class="input-field col s6">
                      <input
                        id="country"
                        placeholder="Country Search"
                        onChange={(event) =>
                          this.setState({ keyword: event.target.value })
                        }
                      />
                    </div>
                    <div class="row">
                      <div>Search By:</div>
                      <p>
                        <label>
                          <input
                            name="by"
                            type="radio"
                            onClick={() => this.setState({ by: "name" })}
                          />
                          <span>Name</span>
                        </label>
                      </p>
                      <p>
                        <label>
                          <input
                            name="by"
                            type="radio"
                            onClick={() => this.setState({ by: "fullname" })}
                          />
                          <span>Full Name</span>
                        </label>
                      </p>
                      <p>
                        <label>
                          <input
                            name="by"
                            type="radio"
                            onClick={() => this.setState({ by: "code" })}
                          />
                          <span>Code</span>
                        </label>
                      </p>
                    </div>
                  </div>
                  <div class="divider"></div>
                  <div class="row"></div>
                  <div class="row">
                    <div class="col">
                      <button
                        class="btn waves-effect waves-light"
                        type="submit"
                        name="action"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div>
          {this.state.countryInfo && this.state.countryInfo != "" ? (
            <div class="row">
              <h2>Country Info</h2>
              {this.state.countryInfo.map((country, index) => (
                <div class="col s12 m3">
                  <div class="card">
                    <div class="card-image">
                      <img src={country.flag} />
                    </div>
                    <div class="card-stacked">
                      <div class="card-content">
                        <span class="card-title">{country.name}</span>
                        <ul>
                          <li key={index + 1}>
                            Alpha Code 2: {country.alpha2Code}
                          </li>
                          <li key={index + 2}>
                            Alpha Code 3: {country.alpha3Code}
                          </li>
                          <li key={index + 4}>
                            Population: {country.population}
                          </li>
                          <li key={index + 5}>Region: {country.region}</li>
                          <li key={index + 6}>
                            Subregion: {country.subregion}
                          </li>
                          <div>Languages:</div>
                          {country.languages.map((language, index) => (
                            <div class="chip">{language.name}</div>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div>{this.countTotals()}</div>
            </div>
          ) : (
            <div>
              <div class="red-text">{this.state.error}</div>
              <div>Try Searching for Something!</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const dom = document.querySelector("#root");
ReactDOM.render(React.createElement(App), dom);
