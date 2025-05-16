import React, { useState, useRef, useEffect } from 'react';

const ExpandableInput = ({ value, onChange }) => {
    const [expanded, setExpanded] = useState(false);
    const textareaRef = useRef(null);

    useEffect(() => {
        if (expanded && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [expanded]);

    return (
        <div className='expandable-container' onClick={() => setExpanded(true)}>
            {!expanded ? (
                <input type="text" placeholder="Add description" className="expandable-input" readOnly />
            ) : (
                <textarea ref={textareaRef} className="expandable-textarea" placeholder="Add description..." value={value} onChange={(e) => onChange(e.target.value)} />
            )}
        </div>
    );
};

export default ExpandableInput;
