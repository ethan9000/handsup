import "./App.css";
import * as React from "react";
import Poll from "./components/poll";
import "bootstrap/dist/css/bootstrap.min.css";
import Toggle from "./components/toggle";

function App() {
  return (
    <div className="App">
      <Toggle />
      <Poll />
    </div>
  );
}

export default App;
