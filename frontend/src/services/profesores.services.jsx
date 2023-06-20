import axios from 'axios'
import { apiUrl } from '../config'

const BASE_URL = apiUrl + '/profesores'

export const getProfesores = async (page = 0, size = 4) => {
  try {
    const res = await axios.get(BASE_URL + '?size=' + size + '&page=' + page)
    if (!res.data.items || !res.data.success) {
      throw new Error('No se han recibido bien los datos del servidor :(')
    }
    return res.data
  } catch (error) {
    if (error.response) {
      throw new Error(
        error?.response?.data?.message || 'Error al obtener los profesores'
      )
    }
    throw error
  }
}

export const getProfesorById = async (id) => {
  try {
    const res = await axios.get(BASE_URL + `/${id}`)
    if (!res.data.item || !res.data.success) {
      throw new Error('No se han recibido bien los datos del servidor :(')
    }
    return res.data
  } catch (error) {
    if (error.response) {
      throw new Error(
        error?.response?.data?.message || 'Error al obtener el profesor'
      )
    }
    throw error
  }
}

export const deleteProfesor = async (id) => {
  try {
    const res = await axios.delete(BASE_URL + '/' + id)
    if (!res.data.success) {
      throw new Error('Ha ocurrido un fallo con el backend')
    }
    return res.data
  } catch (error) {
    if (error.response) {
      throw new Error(
        error?.response?.data?.message || 'Error al eliminar el profesor'
      )
    }
    throw error
  }
}

export const createProfesor = async (profesor) => {
  try {
    const res = await axios.put(BASE_URL, profesor)
    if (!res.data.message || !res.data.success) {
      throw new Error('Ha ocurrido un fallo con el backend')
    }

    return res.data
  } catch (error) {
    if (error.response) {
      throw new Error(
        error?.response?.data?.message || 'Error al crear el profesor'
      )
    }
    throw error
  }
}

export const updateProfesores = async (profesor, id) => {
  try {
    const res = await axios.put(BASE_URL + '/' + id, profesor)
    if (!res.data.message || !res.data.success) {
      throw new Error('Ha ocurrido un fallo con el backend')
    }

    return res.data
  } catch (error) {
    if (error.response) {
      throw new Error(
        error?.response?.data?.message || 'Error al editar el profesor'
      )
    }
    throw error
  }
}
