import React from 'react';
import './index.css'; 

function Alert({ message, type = 'info' }) {
    return (
        <div className="alertbox mt-5">
            <div className={`alert alert-${type}`}>
            {message}
            </div>
        </div>
    );
}

export default Alert;
