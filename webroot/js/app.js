// TODO sort results by population order

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      by: "",
      error: "",
      countryInfo: [],
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
            countryInfo: [],
            error: "Error:" + res.status,
          });
        } else {
          res
            .json()
            .then((resJson) => {
              console.log("res", resJson);
              console.log("no error");
              var list = resJson[0].sort((a, b) =>
                a.population < b.population ? 1 : -1
              );
              this.setState({ countryInfo: list, error: "" });
            })
            .catch((err) => {
              console.log("error parsing");
              this.setState({
                countryInfo: [],
                error: "Error: Nothing Found.",
              });
            });
        }
      })
      .catch((err) => {
        this.setState({
          countryInfo: "",
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
      <div>
        <h2>
          Total Countries: <span>{totalCountries}</span>
        </h2>
        <h3>Regions:</h3>
        {Object.keys(regions).map((region, i) => (
          <div>
            <h4>{region}</h4>
            <li>Count: {regions[region]}</li>
          </div>
        ))}
        <h3>Sub-Regions:</h3>
        {Object.keys(subregions).map((subregion, i) => (
          <div>
            <h4>{subregion}</h4>
            <li>Count: {subregions[subregion]}</li>
          </div>
        ))}
      </div>
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={(event) => this.submit(event)}>
          <input
            type="text"
            name="country"
            placeholder="Search for a Country"
            onChange={(event) => this.setState({ keyword: event.target.value })}
          />
          <div>
            <br />
            Search By:
            <br />
            <input
              type="radio"
              id="name"
              name="by"
              value="name"
              onClick={() => this.setState({ by: "name" })}
            />
            <label>Name</label>
            <br />
            <input
              type="radio"
              id="fullname"
              name="by"
              value="fullname"
              onClick={() => this.setState({ by: "fullname" })}
            />
            <label>Full Name</label>
            <br />
            <input
              type="radio"
              id="code"
              name="by"
              value="code"
              onClick={() => this.setState({ by: "code" })}
            />
            <label>Code</label>
            <br />
            <button type="submit">Submit</button>
          </div>
          {this.state.countryInfo && this.state.countryInfo != [] ? (
            <div>
              <h1>Country Info</h1>
              {this.state.countryInfo.map((country, index) => (
                <div>
                  <h2>{country.name}</h2>
                  <ul>
                    <li key={index + 1}>{country.alpha2Code}</li>
                    <li key={index + 2}>{country.alpha3Code}</li>
                    <li key={index + 4}>{country.population}</li>
                    <li key={index + 5}>{country.region}</li>
                    <li key={index + 6}>{country.subregion}</li>
                    <li key={index + 7}>{country.flag}</li>
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <div>{this.state.error}</div>
              <div>Try Searching for Something!</div>
            </div>
          )}
        </form>
        <div>{this.countTotals()}</div>
      </div>
    );
  }
}

const dom = document.querySelector("#root");
ReactDOM.render(React.createElement(App), dom);
