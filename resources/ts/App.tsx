import { Component, lazy } from 'solid-js'
import { Routes, Route } from '@solidjs/router'
import { turbo } from './Instances'
import { TurboContext, TurboSolidResourceOptions } from 'turbo-solid'
const Home = lazy(() => import('./Home'))
const SignIn = lazy(() => import('./SignIn'))
const SignUp = lazy(() => import('./SignUp'))
const Dashboard = lazy(() => import('./Dashboard'))
const CreateReservation = lazy(() => import('./CreateReservation'))
const ShowReservation = lazy(() => import('./ShowReservation'))
const Account = lazy(() => import('./Account'))

const App: Component = () => {
  const configuration: TurboSolidResourceOptions = { turbo, clearOnForget: true }

  return (
    <TurboContext.Provider value={configuration}>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/createReservation" component={CreateReservation} />
        <Route path="/showReservation" component={ShowReservation} />
        <Route path="/account" component={Account} />
      </Routes>
    </TurboContext.Provider>
  )
}

export default App
