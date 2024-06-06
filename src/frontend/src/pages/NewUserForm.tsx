import React, { useState } from 'react';
import '../Components/CSS/NewUserForm.css';
import axios from "axios";
import {useNavigate, useLocation} from "react-router-dom";

const NewUserForm = () => {
    const [termAdmitted, setTermAdmitted] = useState('');
    const [admitType, setAdmitType] = useState('');
    const [catalogYear, setCatalogYear] = useState('');
    const [major, setMajor] = useState('');
    const [concentration, setConcentration] = useState('');
    const [minor, setMinor] = useState('');

    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        const searchParams = new URLSearchParams(location.search);
        const userId = searchParams.get('userId');

        event.preventDefault();
        try {
            if (admitType != "FIRST_YEAR_FRESHMAN" && admitType != "TRANSFER") {
                console.log("You need to choose a valid admitType!"); // we will change this to a dropdown
            }
            const response = await axios.patch(`/api/users/${userId}`, {
                term_admitted: termAdmitted,
                admit_type: admitType,
                catalog_year: catalogYear,
                major: major,
                concentration: concentration,
                minor: minor,
            });
            if (response.status === 200) {
                navigate("/home");
            } else {
                // Handle unsuccessful user update [ TO DO ]
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className='NewUserForm'>
            <h2>Welcome!</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='termAdmitted'>Term Admitted:</label><br/>
                <input type='termAdmitted' id='termAdmitted' name='termAdmitted' value={termAdmitted}
                       onChange={(event) => setTermAdmitted(event.target.value)} required/><br/>

                <label htmlFor='admitType'>Admit Type:</label><br/>
                <select id='admitType' name='admitType' value={admitType}
                        onChange={(event) => setAdmitType(event.target.value)} required>
                    <option value=''>Select Admit Type</option>
                    <option value='FIRST_YEAR_FRESHMAN'>First Year Freshman</option>
                    <option value='TRANSFER'>Transfer</option>
                </select>

                <label htmlFor='catalogYear'>Catalog Year:</label><br/>
                <input type='catalogYear' id='catalogYear' name='catalogYear' value={catalogYear}
                       onChange={(event) => setCatalogYear(event.target.value)} required/><br/>

                <label htmlFor='major'>Major:</label><br/>
                <input type='major' id='major' name='major' value={major}
                       onChange={(event) => setMajor(event.target.value)} required/><br/>

                <label htmlFor='concentration'>Concentration:</label><br/>
                <input type='concentration' id='concentration' name='concentration' value={concentration}
                       onChange={(event) => setConcentration(event.target.value)} required/><br/>

                <label htmlFor='minor'>Minor:</label><br/>
                <input type='minor' id='minor' name='minor' value={minor}
                       onChange={(event) => setMinor(event.target.value)} required/><br/>

                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default NewUserForm;
