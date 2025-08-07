import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const StaffParent = () => {
    let type = localStorage.getItem("currentType")

    return (
        type == "Staff" ? <Outlet /> : <Navigate to={"/"} />
    )
}

export default StaffParent;