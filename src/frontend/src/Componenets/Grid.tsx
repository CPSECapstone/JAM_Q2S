import React from 'react';
import Quarter from './Quarter';
import "./Grid.css"

function Grid() {
  return (
    <div className = "grid" >
      <div className="year">
        <Quarter year={"Fall 2027"}></Quarter>
        <Quarter year={"Winter 2027"}></Quarter>
        <Quarter year={"Spring 2027"}></Quarter>
      </div>
      <div className="year">
        <Quarter year={"Fall 2028"}></Quarter>
        <Quarter year={"Winter 2028"}></Quarter>
        <Quarter year={"Spring 2028"}></Quarter>
      </div>
      <div className="year">
        <Quarter year={"Fall 2029"}></Quarter>
        <Quarter year={"Winter 2029"}></Quarter>
        <Quarter year={"Spring 2029"}></Quarter>
      </div>
      <div className="year">
        <Quarter year={"Fall 2030"}></Quarter>
        <Quarter year={"Winter 2030"}></Quarter>
        <Quarter year={"Spring 2030"}></Quarter>
      </div>
    </div>
  )
}
export default Grid