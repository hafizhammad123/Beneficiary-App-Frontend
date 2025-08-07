import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { FindUser, GenrateToken, Login, RegisterBeneficiaryPage } from './Role'
import { AllBeneficiaries, AllTokens, BeneficiaryDetail, CreateStaff, NewBeneficiaries, Reports, VerifyOtpPage } from './Role/Admin'
import StaffPage from './Role/DepartmentStaff/CheckToken'
import AdminParent from './Routes/AdminParent'
import ReceptionParent from './Routes/Reception'
import StaffParent from './Routes/Staff'
import AuthParent from './Routes/AuthParent'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        {/* Login Route */}
        <Route element={<AuthParent />}>
          <Route path='/' element={<Login />} />
        </Route>

        {/* Receptionist Route */}
        <Route element={<ReceptionParent />}>
          <Route path='/receptionist/findUser' element={<FindUser />} />
          <Route path='/receptionist/RegisterBeneficiary' element={<RegisterBeneficiaryPage />} />
          <Route path='/receptionist/GenrateToken' element={<GenrateToken />} />
        </Route>

        {/* Staff Page Route */}
        <Route element={<StaffParent />}>
          <Route path='/staff' element={<StaffPage />} />
        </Route>

        {/* Admin Page Route */}
        <Route element={<AdminParent />}>
          <Route path='/admin-createStaff' element={<CreateStaff />} />
          <Route path='/admin-allBeneficarit' element={<AllBeneficiaries />} />
          <Route path='/admin-allBeneficarit/:cnic' element={<BeneficiaryDetail />} />
          <Route path='/admin-allToken' element={<AllTokens />} />
          <Route path='/admin-newBeneficarit' element={<NewBeneficiaries />} />
          <Route path='/admin-report' element={<Reports />} />
          <Route path='/admin-verfiyOtp' element={<VerifyOtpPage />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
