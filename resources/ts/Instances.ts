import http from 'axios'
import { createTurboQuery } from 'turbo-solid'

export const axios = http.create({
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
})

export const turbo = createTurboQuery({
  async fetcher(key, { signal }) {
    const response = await axios.get(key, { signal })
    return response.data.data
  },
})
