import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='flex flex-col items-center justify-evenly container h-screen'>
      <div className='flex w-screen justify-center bg-violet-400'>
        <h2 className='text-5xl font-extrabold py-10 w-1/3 text-center'>
          Sistema de Administración Estudiantil
        </h2>
      </div>
      <div className='flex flex-row w-full justify-evenly text-center'>
        <div className='w-full md:w-1/4 px-3 border-4 rounded-lg hover:border-violet-300'>
          <h2 className='text-4xl font-extrabold my-8 '>Profesores</h2>
          <Link to='/ProfesoresForm'>
            <button className='text-violet-600 bg-[#f9f9f9] rounded-lg text-[1em] font-medium cursor-pointer px-[0.6em] py-[1em] transition-all border-2 hover:border-violet-400 mb-3'>
              Ir a profesores
            </button>
          </Link>
        </div>

        <div className='flex flex-col items-center md:w-1/4 px-3 border-4 rounded-lg hover:border-violet-300'>
          <h2 className='text-4xl font-extrabold my-8'>Estudiantes</h2>
          <Link to='/EstudiantesForm'>
            <button className='text-violet-600 bg-[#f9f9f9] rounded-lg text-[1em] font-medium cursor-pointer px-[0.6em] py-[1em] transition-all border-2 hover:border-violet-400 mb-3'>
              Ir a estudiantes
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
