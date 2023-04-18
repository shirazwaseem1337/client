import React, { useMemo } from 'react'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";     // we created
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "scenes/layout";
import Home from "scenes/Home"
import Students from "scenes/students";
// import Customers from "scenes/customers";
import Scholarshipsss from "scenes/scholarshipss"
// import Overview from "scenes/overview";
// import Daily from "scenes/daily";
// import Monthly from "scenes/monthly";
// import Breakdown from "scenes/breakdown";
// import Admin from "scenes/admin";
import ScholarShipAll from "./scenes/scholarship/AllScholarships"
import ScholarShipAdd from "./scenes/scholarship/AddScholarship"
import ScholarShipEdit from "./scenes/scholarship/EditScholarship"

import AddAnnoucement from "./scenes/Annoucement/AddAnnoucement"
import AllAnnoucement from "./scenes/Annoucement/AllAnnoucement"
import EditAnnoucement from "./scenes/Annoucement/EditAnnoucement"


const App = () => {

  // grab the state we just created in state and got the dark mode
  const mode = useSelector((state) => state.global.mode)

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />                 {/* we got the theme */}
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/students" element={<Students />} />
              {/* <Route path="/customers" element={<Customers />} /> */}
              <Route path="/scholarshipsss" element={<Scholarshipsss />} />
              {/* <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<Breakdown />} />
              <Route path="/admin" element={<Admin />} /> */}
              <Route path="/scholarship" element={<ScholarShipAll />} />
              <Route path="/scholarship/add" element={<ScholarShipAdd />} />
              <Route path="/scholarship/edit/:id" element={<ScholarShipEdit />} />

              <Route path="/annoucement" element={<AllAnnoucement />} />
              <Route path="/annoucement/add" element={<AddAnnoucement />} />
              <Route path="/annoucement/edit/:id" element={<EditAnnoucement />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App