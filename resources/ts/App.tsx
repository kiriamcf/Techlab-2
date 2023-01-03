import { Component, createEffect, lazy } from 'solid-js'
import { Routes, Route } from '@solidjs/router'
import { turbo } from './Instances'
import { createTurboResource, TurboContext, TurboSolidResourceOptions } from 'turbo-solid'
import Notifications from './components/singleUse/Notifications'
const Home = lazy(() => import('./Home'))
const SignIn = lazy(() => import('./SignIn'))
const SignUp = lazy(() => import('./SignUp'))
const Dashboard = lazy(() => import('./Dashboard'))
const CreateReservation = lazy(() => import('./CreateReservation'))
const ShowReservation = lazy(() => import('./ShowReservation'))
const Account = lazy(() => import('./Account'))
const AdminPanel = lazy(() => import('./AdminPanel'))
const AdminRFID = lazy(() => import('./AdminRFID'))
const AdminMachine = lazy(() => import('./AdminMachine'))
const AdminLaboratory = lazy(() => import('./AdminLaboratory'))
const AdminConsumption = lazy(() => import('./AdminConsumption'))

const App: Component = () => {
  const configuration: TurboSolidResourceOptions = { turbo, clearOnForget: true }

  return (
    <Notifications>
      <TurboContext.Provider value={configuration}>
        <Routes>
          <Route path="/" component={Home} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/createReservation" component={CreateReservation} />
          <Route path="/showReservation" component={ShowReservation} />
          <Route path="/account" component={Account} />
          <Route path="/adminpanel" component={AdminPanel}></Route>
          <Route path="/adminpanel/rfid" component={AdminRFID}></Route>
          <Route path="/adminpanel/machines" component={AdminMachine}></Route>
          <Route path="/adminpanel/laboratories" component={AdminLaboratory}></Route>
          <Route path="/adminpanel/consumption" component={AdminConsumption}></Route>
        </Routes>
      </TurboContext.Provider>
    </Notifications>
  )
}

export default App
