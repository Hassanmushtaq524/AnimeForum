import React, { useState } from 'react'
// CSS
import "./Overlay.css";
export default function Overlay({btnText, children}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
        <button className="btn btn-overlay" onClick={() => {setIsOpen(true)}}> {btnText} </button>
        { isOpen && 
        <div id="overlay" onClick={() => {setIsOpen(false)}}>
            <button className="btn" onClick={() => {setIsOpen(false)}}>Close</button>
            <div className="overlay-component">
                 {children}
            </div>
        </div>
        }
        </>
    )
}
