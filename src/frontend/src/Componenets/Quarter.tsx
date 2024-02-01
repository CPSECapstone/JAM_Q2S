import React from "react";
import "./Quarter.css";

function Quarter ({ year } : { year : string}) : JSX.Element {
  let clickEvent = () => {
    alert("you clicked on " + year)
  };
  return (
    <div className="quarter" onClick={() => clickEvent()}>
      <div className="title">
        <p>{year}</p>
      </div>
      <div className="body">

      </div>
    </div>
  );
}

export default Quarter