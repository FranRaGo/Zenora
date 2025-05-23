import React, { useState } from "react";

import DropdownPriority from "./PriorityDropdown";

const Priority = ({priority, taskId, setPriority}) => {
    const [dropdown, setDropdown] = useState(false);
    const color = ["#9f9f9f","#606060", "#3e63dd", "#ffc53e", "#e63237"]
    const priorityLabels = [" ", "Low", "Normal", "Medium", "High"];

    return(
        <div className="btn-priority" onClick={() => setDropdown(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill={color[priority]} viewBox="0 0 24 24" stroke-width="1" stroke={color[priority]}>
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
            </svg>
            <p>{priorityLabels[priority]}</p>
            {dropdown && < DropdownPriority priority={priority} taskId={taskId} setPriority={setPriority} onClose={() => setDropdown(false)} />}
        </div>
    );
}

export default Priority;
