import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './cores/home'
import Estudiantes from './cores/tables/estudiantes/index'
import Profesores from './cores/tables/profesores/index'

/* import Table from './components/Table'
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        {/*   {<Route path='/TablaPrueba' element={<Table data={data} />} />} */}
        <Route path='/Estudiantes' element={<Estudiantes />} />
        <Route path='/Profesores' element={<Profesores />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
