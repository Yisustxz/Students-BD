import axios from 'axios'
import { apiUrl } from '../config'

const BASE_URL = apiUrl + '/escuelas'

export const getEscuelas = async () => {
  console.log(BASE_URL)
  try {
    const res = await axios.get(BASE_URL)
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
