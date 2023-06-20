import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './cores/home'
import Escuelas from './cores/tables/escuelas'
import Estudiantes from './cores/tables/estudiantes'
import EstudiantesForm from './cores/tables/estudiantes/form'

import Profesores from './cores/tables/profesores'

/* import Table from './components/Table'
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Escuelas' element={<Escuelas />} />
        <Route path='/Estudiantes' element={<Estudiantes />} />
        <Route path='/EstudiantesForm' element={<EstudiantesForm />} />
        <Route path='/Profesores' element={<Profesores />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
