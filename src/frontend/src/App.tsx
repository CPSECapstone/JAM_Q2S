import React from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from './Componenets/Grid';
import Class from "./Componenets/Class";

function App() {
    const exampleTermData = [
        {
            termName: "Fall 2027",
            classes: [
                { courseCode: "CSC 101", units: "4", courseName: "Intro to CS" },
                { courseCode: "CSC 203", units: "4", courseName: "Intro to Java" },
                { courseCode: "CSC 225", units: "4", courseName: "Computer Arch" },
                { courseCode: "CSC 305", units: "4", courseName: "Databases" }
            ]
        },
        {
            termName: "Winter 2027",
            classes: [
                { courseCode: "MATH 123", units: "4", courseName: "Calc 1" },
                { courseCode: "PHYS 141", units: "4", courseName: "Physics 1" },
                { courseCode: "CSC 357", units: "4", courseName: "Systems Prog" }
            ]
        },
        {
            termName: "Spring 2027",
            classes: []
        },
        {
            termName: "Fall 2028",
            classes: []
        },
        {
            termName: "Winter 2028",
            classes: []
        },
        {
            termName: "Spring 2028",
            classes: []
        },
        {
            termName: "Fall 2029",
            classes: []
        },
        {
            termName: "Winter 2029",
            classes: []
        },
        {
            termName: "Spring 2029",
            classes: []
        },
        {
            termName: "Fall 2030",
            classes: []
        },
        {
            termName: "Winter 2030",
            classes: []
        },
        {
            termName: "Spring 2030",
            classes: []
        }
    ];

    return (
        <div className="App">
            <Grid termData={exampleTermData}></Grid>
        </div>
    );
}

export default App;
