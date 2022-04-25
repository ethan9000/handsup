import React from "react";

function Follow() {
  function clickMe() {
    alert("Now Following");
  }

  return <button onClick={clickMe}>Follow</button>;
}

export default Follow;
