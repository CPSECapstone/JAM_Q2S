import React, {useEffect} from 'react';
import '../Components/CSS/About.css';
import {Link} from "react-router-dom";
import Divider from "@mui/material/Divider";

const About = () => {
    const currentYear = new Date().getFullYear();

    useEffect(() => {
    }, []);

    return(
        <div className='About'>
            <div className='topBar'>
                <h1 className="userName">PolyPlannerPro</h1>
                <button className='button'>
                    <Link style={{color:'white', textDecoration: 'none'}} to="/home">HOME</Link>
                </button>
            </div>
            <div className="mainPage">
                <div className="about-section">
                    <h2 style={{textAlign: 'center', padding: '3%'}}>About Poly Planner Pro</h2>
                    <div>
                        <p>Poly Planner Pro is an interactive website that provides quarter-to-semester mappings and allows students to efficiently plan/visualize
                            possible paths to graduation. It is a tool designed to assist students through their journey transitioning to semesters and beyond.</p>
                        <p>Poly Planner Pro was initially commissioned by the Engineering Student Services at Cal Poly SLO as a Software
                            Engineering Capstone project in Fall 2023. As of Fall 2023, Cal Poly was the last campus within the California State University system
                            still on the quarter calendar. At the request of the Office of the Chancellor, the university was informed in October of 2021 that it
                            would begin the process of converting to a semester calendar, which would be implemented by the start of the 2026-2027 academic year.
                            As a result, students enrolled at Cal Poly will be going through the transition to semesters. It will be vital to ensure students are
                            meeting their degree requirements throughout this period. Poly Planner Pro is a a web-based curriculum planner solution that will help
                            alleviate advisor workload and provide clarity to students on their required courses.
                        </p>
                    </div>
                </div>

                <Divider sx={{ height: 2 }} className='divider'/>

                <div className="row">
                    <h2 style={{padding: '3%', textAlign: 'center'}}>About Our Team</h2>
                    <p>The original creators of Poly Planner Pro are a Software Engineering Capstone team called JAM.
                        Team JAM consists of Andrew Estrada, Archie Jones, Jamie Luna, Jenny Ferriol and Mitashi Parikh,
                        who were all 4th year Software Engineering majors at the time. JAM began working on Poly Planner
                        Pro in Fall 2023 as a commission from the Engineering Student Services at Cal Poly.</p>
                    <div className="card">
                        <div className="container">
                            <h3>Andrew Estrada</h3>
                            <p className="title">SOFTWARE ENGINEER</p>
                            <p>LINKEDIN</p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="container">
                            <h3>Archie Jones</h3>
                            <p className="title">SOFTWARE ENGINEER</p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="container">
                            <h3>Jamie Luna</h3>
                            <p className="title">SOFTWARE ENGINEER</p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="container">
                            <h3>Jenny Ferriol</h3>
                            <p className="title">SOFTWARE ENGINEER</p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="container">
                            <h3>Mitashi Parikh</h3>
                            <p className="title">SOFTWARE ENGINEER</p>
                        </div>
                    </div>
                </div>
            </div>
            <footer style={{color: 'grey', fontSize: '3', padding: "1%"}}>
                <text>&copy; 2023-{currentYear} PolyPlannerPro | All rights reserved.</text>
            </footer>
        </div>
    )

};

export default About;
