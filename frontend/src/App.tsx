import { useState } from 'react'

import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Layout from './layout/Layout'


function App() {

  return (
    <Router>
     <Routes>
      <Route path="/" element={<Layout/>}></Route>
      <Route path='/search' element={<>Search</>}></Route>
      <Route path='*' element={<Navigate to="/"></Navigate>}></Route>
     </Routes>
     
    </Router>
  )
}

export default App


// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";

// const App = () => {
 
//   return (
//     <Router>
//       <Routes>

//       </Routes>
//     </Router>
//   );
// };

// export default App;