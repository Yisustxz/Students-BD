import { useState, useEffect } from 'react'

const Table = ({ data }) => {
  const [columns, setColumns] = useState([])
  const [tableData, setTableData] = useState(data)

  // Función para obtener los nombres de columna
  const getColumnNames = () => {
    if (data.length > 0) {
      // Obtiene los nombres de columna de la primera fila de datos
      const names = Object.keys(data[0])
      // Agrega una columna para los botones de eliminar y crear
      names.push('Acciones')
      // Guarda los nombres de columna en el estado local
      setColumns(names)
    }
  }

  // Llama a getColumnNames cuando se monta el componente
  useEffect(() => {
    getColumnNames()
  }, [])

  const deleteRow = (index) => {
    console.log('estoy borrando')
    const newData = data.filter((element) => element !== index)
    newData.splice(index, 1)
    setTableData(newData)
  }

  return (
    <div className='container mx-auto'>
      <table className='w-full border-collapse'>
        <thead>
          <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
            {columns.map((column) => (
              <th key={column} className='py-3 px-6 text-left'>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index} className='border-b border-gray-200'>
              {columns.map((column, index) => (
                <td key={index} className='py-3 px-6 text-left'>
                  {/* Renderiza los datos de la columna */}
                  {column !== 'Acciones' ? (
                    row[column]
                  ) : (
                    // Renderiza los botones de eliminar y crear
                    <>
                      <button
                        onClick={() => deleteRow(index)}
                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mr-2'
                      >
                        Eliminar
                      </button>
                      <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full'>
                        Editar
                      </button>
                    </>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Table
