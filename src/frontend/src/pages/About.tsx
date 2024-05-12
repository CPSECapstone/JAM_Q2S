import React, {useEffect} from 'react';
import '../Components/CSS/About.css';
import {Link} from "react-router-dom";

const About = () => {
    useEffect(() => {
    }, []);

    return(
        <div className='About'>
            <div className="about-section">
                <h1>About Poly Planner Pro</h1>
                <div>
                    <p>Some text about who we are and what we do.</p>
                    <p>Resize the browser window to see that this page is responsive by the way.</p>
                </div>
                <div>
                    <button className='button'>
                        <Link style={{color:'white', textDecoration: 'none'}} to="/home">HOME</Link>
                    </button>
                </div>
            </div>

            <div className="row">
                <h2 style={{padding: '2%', color: 'white', textAlign: 'center'}}>Our Team</h2>
                <div className="column">
                    <div className="card">
                        <img src="/w3images/team1.jpg" alt="Jane" style={{width: "100%"}} />
                            <div className="container">
                                <h2>Jane Doe</h2>
                                <p className="title">SOFTWARE ENGINEER</p>
                                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                            </div>
                    </div>
                </div>

                <div className="column">
                    <div className="card">
                        <img src="/w3images/team2.jpg" alt="Mike" style={{width: "100%"}}/>
                            <div className="container">
                                <h2>Mike Ross</h2>
                                <p className="title">SOFTWARE ENGINEER</p>
                                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                            </div>
                    </div>
                </div>

                <div className="column">
                    <div className="card">
                        <img src="/w3images/team3.jpg" alt="John" style={{width: "100%"}}/>
                            <div className="container">
                                <h2>John Doe</h2>
                                <p className="title">SOFTWARE ENGINEER</p>
                                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default About;
