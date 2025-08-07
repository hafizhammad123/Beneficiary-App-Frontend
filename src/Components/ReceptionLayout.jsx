import React from 'react'
import ReceptionNavbar from '../Role/Receptionist/ReceptionNavbar'

const ReceptionLayout = ({ children }) => {
    return (
        <>
            <ReceptionNavbar />
            {children}
        </>

    )
}

export default ReceptionLayout