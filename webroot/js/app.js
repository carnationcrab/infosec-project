class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      by: "",
      error: "",
    };
  }

  submit(event) {
    console.log(this.state);
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
        </form>
      </div>
    );
  }
}

const dom = document.querySelector("#root");
ReactDOM.render(React.createElement(App), dom);
