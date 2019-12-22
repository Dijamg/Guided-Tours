import axios from 'axios'
const baseUrl = 'https://guidedtoursjson.herokuapp.com/Buildings'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {
      return response.data
    })
  }

export default { getAll }