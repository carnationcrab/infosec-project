//Write your javascript here, or roll your own. It's up to you.
//Make your ajax call to http://localhost:8765/api/index.php here

class App extends React.Component {
  render() {

    return (
        <div>
            Works
        </div>);
  }
}

const dom = document.querySelector("#root");
ReactDOM.render(React.createElement(App), dom);
