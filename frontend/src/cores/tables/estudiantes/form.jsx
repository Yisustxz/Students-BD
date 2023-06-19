function EstudiantesForm() {
  return (
    <form className='flex flex-col items-center justify-center container'>
      <h2 className='text-4xl font-extrabold dark:text-white my-8 w-screen bg-violet-400 text-center py-5'>
        Estudiantes
      </h2>
      <div className='flex flex-wrap mx-64 mb-6'>
        <div className='w-full md:w-1/2 px-3'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='grid-last-name'
          >
            cedula
          </label>
          <input
            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='grid-last-name'
            type='text'
            placeholder='25595817'
          />
        </div>

        <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='grid-first-name'
          >
            Nombre
          </label>
          <input
            className='appearance-none block w-full bg-gray-200 text-gray-700 border py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
            id='grid-first-name'
            type='text'
            placeholder='Jane'
          />
        </div>
        <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='phone'
          >
            Numero de Telefono
          </label>
          <input
            className='appearance-none block w-full bg-gray-200 text-gray-700 border py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
            id='phone'
            type='text'
            placeholder='04147691677'
          />
        </div>
        <div className='w-full md:w-1/2 px-3'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='address'
          >
            Direccion
          </label>
          <input
            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='address'
            type='text'
            placeholder='Avenida Guayana'
          />
        </div>

        <div className='w-full md:w-1/2 px-3'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='birth'
          >
            Fecha de Nacimiento
          </label>
          <input
            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-2'
            id='birth'
            type='date'
            // value='2001-07-22'
            min='1970-01-01'
            max='2020-12-31'
          />
        </div>

        <div className='w-full md:w-1/2 px-3'>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
            estatus del estudiante
          </label>
          <select
            data-te-select-init
            className='py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500  bg-gray-200 dark:border-gray-700 dark:text-gray-400'
          >
            <option value='A'>Activo</option>
            <option value='R'>Retirado</option>
            <option value='N'>No inscrito</option>
            <option value='E'>Egresado</option>
          </select>
        </div>
        <div className='w-full md:w-1/2 px-3'>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
            escuela del estudiante
          </label>
          <select
            data-te-select-init
            className='py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500  bg-gray-200 dark:border-gray-700 dark:text-gray-400'
          >
            <option value='A'>Activo</option>
            <option value='R'>Retirado</option>
            <option value='N'>No inscrito</option>
            <option value='E'>Egresado</option>
          </select>
        </div>
      </div>
      <button
        type='submit'
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        Procesar
      </button>
    </form>
  )
}

export default EstudiantesForm