import React, { useState, useEffect } from "react";
import { Table } from "@chakra-ui/react";
import Profile from "../../global/profile/profile";
import "../../../styles/employees.css";
import ConfirmPopup from "../../global/popup/ConfirmPopup";
import { getActiveUser } from "../../../utils/getActiveUser";

const Employees = ({ idUser, space }) => {
  const [employees, setEmployees] = useState(null);
  const [popupDelete, setPopupDelete] = useState(false);
  const [deleteEmployeeConfirm, setDeleteEmployeeConfirm] = useState(false);
  const [employeeSelect, setEmployeeSelect] = useState(null);




  useEffect(() => {
    if (deleteEmployeeConfirm && employeeSelect) {
      fetch(`http://localhost:3000/api/deleteUserSpace/${employeeSelect}/${space.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => {
        setDeleteEmployeeConfirm(false)
          setEmployeeSelect(false);
          setPopupDelete(false);
        })
        .catch((er) => {
          setError(er.message || "Unexpected error");
        });
    }
  }, [deleteEmployeeConfirm]);

  useEffect(() => {
    const getModulSpace = async () => {
      if (!space) return;
      try {
        const res = await fetch(
          `http://localhost:3000/api/usersSpace/${space.id}`
        );
        if (res.ok) {
          const data = await res.json();
          setEmployees(data);
        }
      } catch (err) {
        console.error("Error get modulos", err);
      }
    };
    getModulSpace();
  }, [space, idUser,deleteEmployeeConfirm]);

  if (!employees) return null;

  return (
    <div className="table-container">
      <div className="dark-table table-scroll">
        <table className="dark-table">
          <thead>
            <tr>
              <th className="left-border">Picture</th>
              <th>Name</th>
              <th>Email</th>
              <th className="right-border">Role</th>
              {idUser && (
                <th></th>
              )}
            </tr>
          </thead>
          <tbody>
            {employees.length < 1 ? (
              <p className="secondText">No employees available</p>
            ) : (
              employees.map(
                (employee, index) =>
                  employee.id !== idUser && (
                      <tr key={index}>
                        <td>
                          <Profile
                            userId={employee.id}
                            styleCss={"profile_icon"}
                          />
                        </td>
                        <td>
                          {employee.first_name + " " + employee.last_name}
                        </td>
                        <td>{employee.email}</td>
                        <td>{employee.role}</td>
                        {employee.role && (
                          <td>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="alertChatAction deleteEmployeeIcon"
                            onClick={() => {
                              setPopupDelete(true);
                              setEmployeeSelect(employee.id);
                            }}
                            >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                          </svg>
                              </td>
                        )}
                      </tr>
                  )
              )
            )}
          </tbody>
        </table>
      </div>
       {popupDelete && (
            <ConfirmPopup
              text={"Are you sure you want to delete employee?"}
              set={setDeleteEmployeeConfirm}
              setPopup={setPopupDelete}
            />
          )}
    </div>
  );
};

export default Employees;
