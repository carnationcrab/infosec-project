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
              <h2>Country Info</h2>
              {this.state.countryInfo.map((country, index) => (
                <div>
                  <h3>{country.name}</h3>
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
      </div>
    );
  }
}

const dom = document.querySelector("#root");
ReactDOM.render(React.createElement(App), dom);
