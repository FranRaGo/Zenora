import React, { useState, useEffect } from "react";
import Profile from "../../global/profile/Profile";
import "../../../styles/employees.css";
import ConfirmPopup from "../../global/popup/ConfirmPopup";

const Employees = ({ idUser, space, userInfo }) => {
  const [employees, setEmployees] = useState(null);
  const [popupDelete, setPopupDelete] = useState(false);
  const [deleteEmployeeConfirm, setDeleteEmployeeConfirm] = useState(false);
  const [employeeSelect, setEmployeeSelect] = useState(null);

  const [popupRole, setPopupRole] = useState(null);
  const [roleConfirm, setRoleConfirm] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (deleteEmployeeConfirm && employeeSelect) {
      fetch(
        `http://localhost:3000/api/deleteUserSpace/${employeeSelect}/${space.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(() => {
          setDeleteEmployeeConfirm(false);
          setEmployeeSelect(false);
          setPopupDelete(false);
        })
        .catch((er) => {
          setError(er.message || "Unexpected error");
        });
    }
  }, [deleteEmployeeConfirm]);

  useEffect(() => {
    if (roleConfirm && employeeSelect) {
      const newRole = role === "admin" ? "member" : "admin";

      const values = {
        role: newRole,
      };
      fetch(
        `http://localhost:3000/api/updateSpaceUserRole/${employeeSelect}/${space.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      )
        .then(() => {
          setRoleConfirm(false);
          setEmployeeSelect(false);
          setRole(null);
          setPopupRole(false);
        })
        .catch((er) => {
          setError(er.message || "Unexpected error");
        });
    }
  }, [roleConfirm]);

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
  }, [space, idUser, deleteEmployeeConfirm, roleConfirm]);

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
              <th className={userInfo?.role !== "admin" ? "right-border" : ""}>
                Role
              </th>
              {userInfo?.role === "admin" && <th className="right-border"></th>}
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
                      <td>{employee.first_name + " " + employee.last_name}</td>
                      <td>{employee.email}</td>
                      <td>
                        {employee.role}{" "}
                        {employee.role === "admin" &&
                          userInfo?.role === "admin" &&
                          employee?.owner !== 1 && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="2.0"
                              stroke="currentColor"
                              className="roleEmployeeIcon"
                              onClick={() => {
                                setPopupRole(true);
                                setEmployeeSelect(employee.id);
                                setRole(employee.role);
                              }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
                              />
                            </svg>
                          )}
                        {employee.role === "member" &&
                          userInfo?.role === "admin" &&
                          employee?.owner !== 1 && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="2.0"
                              stroke="currentColor"
                              className="roleEmployeeIcon"
                              onClick={() => {
                                setPopupRole(true);
                                setEmployeeSelect(employee.id);
                                setRole(employee.role);
                              }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m4.5 18.75 7.5-7.5 7.5 7.5"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m4.5 12.75 7.5-7.5 7.5 7.5"
                              />
                            </svg>
                          )}
                      </td>
                      {userInfo?.role === "admin" && (
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
                              d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
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
      {popupRole && (
        <ConfirmPopup
          text={"Are you sure you want to change the employee's role?"}
          set={setRoleConfirm}
          setPopup={setPopupRole}
        />
      )}
    </div>
  );
};

export default Employees;
