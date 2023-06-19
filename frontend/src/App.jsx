import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './cores/home'
import Estudiantes from './cores/tables/estudiantes/form'
import Profesores from './cores/tables/profesores/form'
// import Table from './components/Table'
// import data from './data.json'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/TablaPrueba' element={<Table data={data} />} /> */}
        <Route path='/EstudiantesForm' element={<Estudiantes />} />
        <Route path='/ProfesoresForm' element={<Profesores />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
