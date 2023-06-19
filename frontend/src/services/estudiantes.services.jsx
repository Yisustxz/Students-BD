import axios from 'axios'
import { apiUrl } from '../config'

const BASE_URL = apiUrl + '/estudiantes'

export const getEstudiantes = async (page = 0) => {
  try {
    const res = await axios.get(BASE_URL + '?size=10&page=' + page)
    if (!res.data.items || !res.data.success) {
      throw new Error('No se han recibido bien los datos del servidor :(')
    }
    return res.data
  } catch (error) {
    if (error.response) {
      throw new Error(
        error?.response?.data?.message || 'Error al obtener los estudiantes'
      )
    }
    throw error
  }
}

export const getEstudianteById = async (id) => {
  try {
    const res = await axios.get(BASE_URL + `/${id}`)
    if (!res.data.item || !res.data.success) {
      throw new Error('No se han recibido bien los datos del servidor :(')
    }
    return res.data
  } catch (error) {
    if (error.response) {
      throw new Error(
        error?.response?.data?.message || 'Error al obtener el estudiante'
      )
    }
    throw error
  }
}

export const deleteEstudiante = async (id) => {
  try {
    const res = await axios.delete(BASE_URL + '/' + id)
    if (!res.data.message || !res.data.success) {
      throw new Error('Ha ocurrido un fallo con el backend')
    }
    return res
  } catch (error) {
    if (error.response) {
      throw new Error(
        error?.response?.data?.message || 'Error al eliminar cromo'
      )
    }
    throw error
  }
}

export const createEstudiante = async (estudiante) => {
  try {
    const res = await axios.put(BASE_URL, estudiante)
    if (!res.data.message || !res.data.success) {
      throw new Error('Ha ocurrido un fallo con el backend')
    }

    return res
  } catch (error) {
    if (error.response) {
      throw new Error(
        error?.response?.data?.message || 'Error al crear el profesor'
      )
    }
    throw error
  }
}

export const updateEstudiantes = async (estudiante, id) => {
  try {
    const res = await axios.put(BASE_URL + '/' + id, estudiante)
    if (!res.data.message || !res.data.success) {
      throw new Error('Ha ocurrido un fallo con el backend')
    }

    return res
  } catch (error) {
    if (error.response) {
      throw new Error(
        error?.response?.data?.message || 'Error al editar el estudiante'
      )
    }
    throw error
  }
}
