import App from './App.jsx'
import './Index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Welcome from './pages/Welcome/Welcome.jsx'
import Login from './pages/Login/Login.jsx'
import SignUp from './pages/SignUp/SignUp.jsx'
import AddData from './pages/AddData/AddData.jsx'
import LoadResult from './pages/LoadResult/LoadResult.jsx'
// import ListResult from './pages/Result/History.jsx'
import Home from './pages/Home/Home.jsx'
import ResultPage from './pages/Result/ResultPage.jsx'
import { PieChart } from './pages/Result/PieChart.jsx'
import ProtectedRoutes from './utils/ProtectedRoutes.jsx'
import CheckScheduled from './pages/Doctors/CheckScheduled/CheckScheduled.jsx'
import CheckUser from './utils/CheckUser.jsx'
import MeetingDoctor from './pages/Doctors/Meeting/MeetingDoctor.jsx'
import MeetingUser from './pages/Patient/MeetingUser.jsx'
import History from './pages/Result/History.jsx'
import PatientPage from './pages/Patient/Patient.jsx'
import PatientProfile from './pages/User/PatientProfile.jsx'
import UserInfo from './pages/User/UserInfo.jsx'
import Medical from './pages/Medical/Medical.jsx'
import MakeAppointment from './pages/User/MakeAppointment.jsx'
import Appointment from './pages/User/Appointment.jsx'
import HistoryPage from './pages/History/HistoryPage.jsx'
import AppointmentDetail from './pages/Appoitment/AppoitmentDetail.jsx'
import DoctorList from './pages/Doctors/ListDoctor.jsx'
import DoctorPage from './pages/Doctors/DoctorPage.jsx'
import DoctorRegister from './pages/Doctors/DoctorRegister.jsx'
import SettingsScreen from './pages/Setting/Setting.jsx'
import ListDoctorPage from './pages/Appoitment/ListDoctorPage.jsx'
import DoctorChatPage from './pages/Chat/DoctorChatPage.jsx'

const rootElement = document.getElementById('root')
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    // <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/setting' element={<SettingsScreen />} />
          <Route path='/user' element={<ProtectedRoutes>
            <UserInfo />
          </ProtectedRoutes>} />
          <Route path='/profile' element={<ProtectedRoutes>
            <PatientProfile />
          </ProtectedRoutes>} />
          <Route path='/medical' element={<Medical />} />
          <Route path='/home' element={<Home />} />
          <Route path='/add-data' element={
            <ProtectedRoutes>
              <CheckUser userComponent={<AddData />} doctorComponent={<><h1>You are doctor</h1></>} />
            </ProtectedRoutes>
          } />
          <Route path='/load-result' element={
            <ProtectedRoutes>
              <CheckUser userComponent={<LoadResult />} doctorComponent={<><h1>You are doctor</h1></>} />
            </ProtectedRoutes>
          } />
          <Route path='/history/result' element={
            <ProtectedRoutes>
              <CheckUser userComponent={<History />} doctorComponent={<><h1>You are doctor</h1></>} />
            </ProtectedRoutes>
          } />
          <Route path='/history' element={
            <ProtectedRoutes>
              <HistoryPage />
            </ProtectedRoutes>
          } />
          <Route path='/doctor' element={
            <ProtectedRoutes>
              <DoctorPage />
            </ProtectedRoutes>
          } />
          <Route path='/doctor/list' element={
            <ProtectedRoutes>
              <DoctorList />
            </ProtectedRoutes>
          } />
          <Route path='/register/doctor' element={
            <ProtectedRoutes>
              <DoctorRegister />
            </ProtectedRoutes>
          } />
          <Route path='/result/:id' element={
            <ProtectedRoutes>
              <ResultPage />
            </ProtectedRoutes>
          } />
          <Route path='/appointment/doctor/list' element={
            <ProtectedRoutes>
              <ListDoctorPage />
            </ProtectedRoutes>
          } />
          <Route path='/chat' element={
            <ProtectedRoutes>
              <ListDoctorPage />
            </ProtectedRoutes>
          } />
          <Route path='/chat/doctor/:id' element={
            <ProtectedRoutes>
              <DoctorChatPage />
            </ProtectedRoutes>
          } />
          <Route path='/appointment' element={
            <ProtectedRoutes>
              <Appointment />
            </ProtectedRoutes>
          } />
          <Route path='/appointment/detail/:id' element={
            <ProtectedRoutes>
              <AppointmentDetail />
            </ProtectedRoutes>
          } />
          <Route path='/make-appointment/:id' element={
            <ProtectedRoutes>
              <MakeAppointment />
            </ProtectedRoutes>
          } />
          <Route path='/chart' element={
            <ProtectedRoutes>
              <PieChart />
            </ProtectedRoutes>} />

          <Route path='patient/meeting' element={
            <ProtectedRoutes>
              <CheckUser userComponent={<MeetingUser />} doctorComponent={<><h1>You are doctor</h1></>} />
            </ProtectedRoutes>} />

          <Route path='/doctor/meeting' element={
            <ProtectedRoutes>
              <CheckUser userComponent={<><h1>You are patient</h1></>} doctorComponent={<MeetingDoctor />} />
            </ProtectedRoutes>} />

          <Route path='/checkScheduled' element={
            <ProtectedRoutes>
              <CheckUser userComponent={<><h1>You are patient</h1></>} doctorComponent={<CheckScheduled />} />
            </ProtectedRoutes>
          } />

          <Route path='/patient-page' element={
            <ProtectedRoutes>
              <CheckUser userComponent={<PatientPage />} doctorComponent={<><h1>You are doctor</h1></>} />
            </ProtectedRoutes>} />

          <Route path='*' element={<h1>Not Found</h1>} />

        </Routes>
      </App>
    </Router>
    // </React.StrictMode>
  )
}
