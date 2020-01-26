import axios from 'axios'
import { Tour } from '../Assets/types'
const baseUrl = 'https://dijaminapi.herokuapp.com/Buildings'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {
      return response.data
    })
  }

  const add = (newObject: Tour) =>{
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
  }

  const update = (id: number, newObject: Tour) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }

export default { getAll, add, update }
