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
      this.setState({ error: "Missing search criteria" });
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
            error: "Error:" + res.status,
          });
        } else {
          res
            .json()
            .then((resJson) => {
              console.log("res", resJson);
              if (resJson === null) {
                console.log("error no response");
                this.setState({ error: "None Found" });
              }
              console.log("no error");
              this.setState({ countryInfo: resJson });
            })
            .catch((err) => {
              console.log("error parsing");
              this.setState({
                error: "Error: " + err,
              });
            });
        }
      })
      .catch((err) => {
        this.setState({
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
          <p>
            Result: <span id="txtHint"></span>
          </p>
        </form>
      </div>
    );
  }
}

const dom = document.querySelector("#root");
ReactDOM.render(React.createElement(App), dom);
