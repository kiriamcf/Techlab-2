import { Component, lazy } from 'solid-js'
import { Routes, Route } from '@solidjs/router'
const Home = lazy(() => import('./Home'))
const SignIn = lazy(() => import('./SignIn'))
const SignUp = lazy(() => import('./SignUp'))

const App: Component = () => {
  return (
    <>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/login" component={SignIn} />
        <Route path="/register" component={SignUp} />
      </Routes>
    </>
  )
}

export default App
