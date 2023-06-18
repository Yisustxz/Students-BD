import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='container mx-auto'>
      <h2 className='text-4xl font-extrabold dark:text-white mb-10'>
        Bienvenidos A la Universidad Yarape
      </h2>
      <div className='flex flex-row -mx-3 mb-6 justify-around'>
        <div className='w-full md:w-1/2 px-3 border-4 rounded-lg hover:border-violet-300'>
          <h2 className='text-4xl font-extrabold dark:text-white my-8'>
            Estudiantes
          </h2>
          <Link to='/EstudiantesForm'>
            <button className='mb-3'>Ir a estudiantes</button>
          </Link>
        </div>

        <div className='w-full md:w-1/2 px-3 border-4 rounded-lg hover:border-violet-300'>
          <h2 className='text-4xl font-extrabold dark:text-white my-8 '>
            Profesores
          </h2>
          <Link to='/ProfesoresForm'>
            <button>Ir a profesores</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
