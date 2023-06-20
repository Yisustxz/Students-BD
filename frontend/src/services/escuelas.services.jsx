import axios from 'axios'
import { apiUrl } from '../config'

const BASE_URL = apiUrl + '/escuelas'

export const getEscuelas = async (page = 0, size = 4) => {
  try {
    const res = await axios.get(BASE_URL + '?size=' + size + '&page=' + page)
    if (!res.data.items || !res.data.success) {
      throw new Error('No se han recibido bien los datos del servidor :(')
    }
    return res.data
  } catch (error) {
    if (error.response) {
      throw new Error(
        error?.response?.data?.message || 'Error al obtener las escuelas'
      )
    }
    throw error
  }
}

export const getEscuelaById = async (id) => {
  try {
    const res = await axios.get(BASE_URL + `/${id}`)
    if (!res.data.item || !res.data.success) {
      throw new Error('No se han recibido bien los datos del servidor :(')
    }
    return res.data
  } catch (error) {
    if (error.response) {
      throw new Error(
        error?.response?.data?.message || 'Error al obtener la escuela'
      )
    }
    throw error
  }
}

export const deleteEscuela = async (id) => {
  try {
    const res = await axios.delete(BASE_URL + '/' + id)
    if (!res.data.success) {
      throw new Error('Ha ocurrido un fallo con el backend')
    }
    return res.data
  } catch (error) {
    if (error.response) {
      throw new Error(
        error?.response?.data?.message || 'Error al eliminar la escuela'
      )
    }
    throw error
  }
}

export const createEscuela = async (escuela) => {
  try {
    const res = await axios.put(BASE_URL, escuela)
    if (!res.data.message || !res.data.success) {
      throw new Error('Ha ocurrido un fallo con el backend')
    }

    return res
  } catch (error) {
    if (error.response) {
      throw new Error(
        error?.response?.data?.message || 'Error al crear la escuela'
      )
    }
    throw error
  }
}

export const updateEscuela = async (escuela, id) => {
  try {
    const res = await axios.put(BASE_URL + '/' + id, escuela)
    if (!res.data.message || !res.data.success) {
      throw new Error('Ha ocurrido un fallo con el backend')
    }

    return res
  } catch (error) {
    if (error.response) {
      throw new Error(
        error?.response?.data?.message || 'Error al editar la escuela'
      )
    }
    throw error
  }
}
