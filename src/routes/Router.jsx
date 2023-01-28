import React from 'react'
import { Route, Routes } from 'react-router-dom'
import App from '../App.js'
import ScreenApprov from '../pages/ScreenApprov.jsx'
import ScreenCongrat from '../pages/ScreenCongrat.jsx'
import ScreenLoader from '../pages/ScreenLoader.jsx'
import ScreenLogo from '../pages/ScreenLogo.jsx'
import ScreenUserField from '../pages/ScreenUserField.jsx'

const Router = () => {
  return (
    <Routes>
        <Route path='/' element={<App />} />
        <Route path='/s1' element={<ScreenLoader />} />
        <Route path='/s2' element={<ScreenLogo />} />
        <Route path='/s3' element={<ScreenUserField />} />
        <Route path='/success' element={<ScreenApprov />} />
        <Route path='/approved' element={<ScreenCongrat />} />
    </Routes>
  )
}

export default Router;