import { Component, Show } from 'solid-js'
import { createTurboResource } from 'turbo-solid'
import { axios, turbo } from './Instances'

interface User {
  name: string
  email: string
}

const Authenticated: Component<{ user: User }> = (props) => {
  const logout = async () => {
    await axios.post('/api/signout')
    turbo.forget('/api/user')
  }

  return (
    <div>
      <div>Authenticated: {props.user.email}</div>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

const Unauthenticated: Component = () => {
  const login = async () => {
    await axios.get('/sanctum/csrf-cookie')

    const response = await axios.post('api/signin', {
      email: 'kiriamcf@gmail.com',
      password: 'kiriam123',
    })

    turbo.mutate('/api/user', response.data.data)
  }

  return (
    <div>
      <div>Unauthenticated</div>
      <button onClick={login}>Login</button>
    </div>
  )
}

const L: Component = () => {
  const [user] = createTurboResource<User>(() => `/api/user`, {
    async fetcher(key, { signal }) {
      const response = await axios.get(key, { signal }).catch(() => undefined)
      return response?.data.data
    },
  })

  return (
    <Show when={user()} fallback={<Unauthenticated />}>
      <Authenticated user={user()!} />
    </Show>
  )
}

export default L
