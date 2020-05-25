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
    if (this.state.keyword == "" || this.state.by == "") {
      return this.setState({
        countryInfo: "",
        error: "Missing search criteria.",
      });
    } else {
      this.setState({ error: "" });
    }

    fetch(
      "/api/index.php" +
        "?keyword=" +
        this.state.keyword +
        "&by=" +
        this.state.by
    ).then((res) => {
      // if good response, set state
      if (res.status === 200) {
        res
          .json()
          .then((resJson) => {
            this.setState({ countryInfo: resJson[0], error: "" });
          })
          .catch((err) => {
            this.setState({
              countryInfo: "",
              error: "Error: Nothing Found.",
            });
          });
      } else {
        // failsafe
        this.setState({
          countryInfo: "",
          error: "Error:" + res.status,
        });
      }
    });
  }

  countTotals() {
    let totalCountries = this.state.countryInfo.length;

    // counts how many are in each region or subregion
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

    return (
      <div className="row">
        <div className="col s12">
          <div className="card">
            <div className="card-content">
              <span className="card-title">Search Stats</span>
              <h6>
                Total Countries: <span>{totalCountries}</span>
              </h6>
              <h6>Regions:</h6>
              {Object.keys(regions).map((region, i) => (
                <div className="chip">
                  {region} (Count: {regions[region]})
                </div>
              ))}
              <h6>Sub-Regions:</h6>
              {Object.keys(subregions).map((subregion, i) => (
                <div className="chip">
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
      <div className="card-panel">
        <h1>Country App</h1>

        <div className="row">
          <div className="col s12">
            <div className="card">
              <div className="card-content">
                <span className="card-title">Search</span>
                <form onSubmit={(event) => this.submit(event)}>
                  <div className="row">
                    <div className="input-field col s6">
                      <input
                        id="country"
                        placeholder="Country Search"
                        onChange={(event) =>
                          this.setState({ keyword: event.target.value })
                        }
                      />
                    </div>
                    <div className="row">
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
                  <div className="divider"></div>
                  <div className="row"></div>
                  <div className="row">
                    <div className="col">
                      <button
                        className="btn waves-effect waves-light"
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
            <div className="row">
              <h2>Country Info</h2>
              {this.state.countryInfo.map((country, index) => (
                <div className="col s12">
                  <div className="card horizontal">
                    <div className="card-image">
                      <img src={country.flag} />
                    </div>
                    <div className="card-stacked">
                      <div className="card-content">
                        <span className="card-title">{country.name}</span>
                        <ul>
                          <li key={"a"}>Alpha Code 2: {country.alpha2Code}</li>
                          <li key={"b"}>Alpha Code 3: {country.alpha3Code}</li>
                          <li key={"c"}>Population: {country.population}</li>
                          <li key={"d"}>Region: {country.region}</li>
                          <li key={"e"}>Subregion: {country.subregion}</li>
                          <div>Languages:</div>
                          {country.languages.map((language, index) => (
                            <div className="chip">{language.name}</div>
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
              <div className="red-text">{this.state.error}</div>
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
