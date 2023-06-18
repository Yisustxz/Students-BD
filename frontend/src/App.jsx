import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Table from './table'
import data from './data.json'
import Home from './cores/home/Home'
import Estudiantes from './cores/estudiantes/EstudiantesForm'
import Profesores from './cores/profesores/ProfesoresForm'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home></Home>} />
        <Route path='/TablaPrueba' element={<Table data={data}></Table>} />
        <Route path='/EstudiantesForm' element={<Estudiantes></Estudiantes>} />
        <Route path='/ProfesoresForm' element={<Profesores></Profesores>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
