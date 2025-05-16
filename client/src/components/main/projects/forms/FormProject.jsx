import React, { useState, useEffect, useRef } from "react";
import useClickOutside from "../../../../utils/useClickOutside";
import ExpandableInput from "./ExpandableInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FromProject = ({ onClose }) => {
    const [desc, setDesc] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

    const ref = useRef();
    useClickOutside(ref, onClose);

    return (
        <div className="formPopUp form-project" ref={ref}>
            <h2>Project</h2>

            <div className="form-fields">
                <label htmlFor="title" className="sr-only">Project name</label>
                <input type="text" name="title" id="title" placeholder="Name of the project" />

                <ExpandableInput value={desc} onChange={setDesc} />

                <div className="banner-upload">
                    <label htmlFor="banner">Upload banner</label>
                    <input type="file" name="banner" id="banner" className="input-file" />
                </div>

                <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} dateFormat="dd/MM/yyyy"
                    customInput={
                        <button className="date-button-custom">
                            {selectedDate
                                ? selectedDate.toLocaleDateString("es-ES")
                                : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                    </svg>
                                )
                            }
                        </button>
                    } />
                <button>Assign</button>
            </div>

            <button className="btn-create">Create Project</button>
        </div>
    )
}

export default FromProject;