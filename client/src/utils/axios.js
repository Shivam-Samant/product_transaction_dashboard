import axiosInstance from 'axios'

const axios = axiosInstance.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL + '/api',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
})

export default axios
