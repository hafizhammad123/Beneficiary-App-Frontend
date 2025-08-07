import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AuthParent = () => {
    let type = localStorage.getItem("currentType")
    console.log(type);
    
    return (
        type == "Admin" ? <Navigate to={"/admin-report"} /> : type === "Receptionist" ? <Navigate to={"/receptionist/findUser"} /> : type == "Staff" ? <Navigate to={"/staff"} /> : <Outlet />
    )
}

export default AuthParent;