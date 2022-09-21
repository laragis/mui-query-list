import { isString, isUndefined } from 'lodash'
import axios from 'axios'

const fetchData = async ({ meta, pageParam, queryKey, signal }) => {
  const { url, params, ...rest } = queryKey[1]

  const request = isString(url)
    ? {
      method: 'get',
      url,
      ...params
    }
    : {
      params: {
        ...params,
        ...url?.params
      },
      ...url
    }

  if (!isUndefined(pageParam)) request.params.page = pageParam


  const response = await axios({
    signal,
    ...request
  })

  return response.data
}

export default fetchData