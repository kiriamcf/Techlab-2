import { Component, lazy } from 'solid-js'
import { Routes, Route } from '@solidjs/router'
import { axios, turbo } from './Instances'
import { createTurboResource, TurboContext, TurboSolidResourceOptions } from 'turbo-solid'
const Home = lazy(() => import('./Home'))
const SignIn = lazy(() => import('./SignIn'))
const SignUp = lazy(() => import('./SignUp'))
const Dashboard = lazy(() => import('./Dashboard'))

interface User {
  id: number
  name: string
  email: string
}

function userData() {
  const [user] = createTurboResource<User>(() => '/api/user', {
    async fetcher(key, { signal }) {
      const response = await axios.get(key, { signal }).catch(() => undefined)
      return response?.data.data
    },
  })
  return user
}

const App: Component = () => {
  const configuration: TurboSolidResourceOptions = { turbo, clearOnForget: true }

  return (
    <TurboContext.Provider value={configuration}>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/dashboard" component={Dashboard} data={userData} />
      </Routes>
    </TurboContext.Provider>
  )
}

export default App
