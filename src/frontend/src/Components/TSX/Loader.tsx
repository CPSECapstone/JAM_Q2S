import React from 'react'
import '../CSS/Loader.css'

export const Loader = () => {
    return (
        <div className="loading-spinner-container">
            <p>Loading...</p>
            <div className="loading-spinner"></div>
        </div>
    )
}