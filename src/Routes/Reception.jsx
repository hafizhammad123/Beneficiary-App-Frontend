import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ReceptionParent = () => {
    let type = localStorage.getItem("currentType")

    return (
     type == "Receptionist" ? <Outlet/> : <Navigate to={"/"}/>
    )
}

export default ReceptionParent;