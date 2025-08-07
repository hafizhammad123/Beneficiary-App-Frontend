import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminParent = () => {
    let type = localStorage.getItem("currentType")

    return (
     type == "Admin" ? <Outlet/> : <Navigate to={"/"}/>
    )
}

export default AdminParent