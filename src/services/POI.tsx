import axios from 'axios'
import { Poi } from '../Assets/types'
const baseUrl = 'https://guidedtoursjson.herokuapp.com/POIs'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {
      return response.data
    })
  }

const add = (newObject: Poi) =>{
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
  }

export default {getAll, add}
 