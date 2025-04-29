import React, { useState } from "react";

const Add = ({ onClose }) => {
    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <button onClick={onClose}>Cerrar</button>
                <h2>Popup de añadir algo</h2>
            </div>
        </div>
    )
}

export default Add;