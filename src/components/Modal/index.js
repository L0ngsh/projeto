import './style.css';
import React from "react";

const Modal = ({children}) => {
    return (
        <div className="overlay">
            {children}
        </div>
    );
}

export default Modal;