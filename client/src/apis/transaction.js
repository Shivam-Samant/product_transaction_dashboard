import { axios } from '../utils'

export const getAll = async (month, searchText, page, perPage) => {
  try {
    const response = await axios.get('/transactions', {
      params: {
        month,
        searchText,
        page,
        perPage
      },
    })
    return response.data
  } catch (err) {
    throw err
  }
}
