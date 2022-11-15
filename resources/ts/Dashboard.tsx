import { Component, createSignal, Match, Show, Switch } from 'solid-js'
import Layout from './Layout'
import Button from './components/Button'
import IconDashboard from './components/Icons/Dashboard'
import IconCreate from './components/Icons/Create'
import IconSearch from './components/Icons/Search'
import IconUser from './components/Icons/User'
import DashboardContent from './components/DashboardContent'
import CreateReservationContent from './components/CreateReservationContent'
import ShowReservationContent from './components/ShowReservationContent'
import AccountContent from './components/AccountContent'

const Dashboard: Component = (props) => {
  const [active, setActive] = createSignal('dashboard')
  return (
    <>
      <Layout auth={true}>
        <main class="w-full max-w-screen-2xl mx-auto flex">
          <div class="p-8 space-y-2">
            <Show
              when={active() == 'dashboard'}
              fallback={
                <Button variant="faded" onClick={() => setActive('dashboard')}>
                  <IconDashboard class="h-6 w-6" />
                  <span class="whitespace-nowrap">Dashboard</span>
                </Button>
              }>
              <Button variant="noHover">
                <IconDashboard class="h-6 w-6" />
                <span class="whitespace-nowrap">Dashboard</span>
              </Button>
            </Show>
            <Show
              when={active() == 'makeReservation'}
              fallback={
                <Button variant="faded" onClick={() => setActive('makeReservation')}>
                  <IconCreate class="h-6 w-6" />
                  <span class="whitespace-nowrap">Make Reservation</span>
                </Button>
              }>
              <Button variant="noHover">
                <IconCreate class="h-6 w-6" />
                <span class="whitespace-nowrap">Make Reservation</span>
              </Button>
            </Show>
            <Show
              when={active() == 'showReservations'}
              fallback={
                <Button variant="faded" onClick={() => setActive('showReservations')}>
                  <IconSearch class="h-6 w-6" />
                  <span class="whitespace-nowrap">Show Reservations</span>
                </Button>
              }>
              <Button variant="noHover">
                <IconSearch class="h-6 w-6" />
                <span class="whitespace-nowrap">Show Reservations</span>
              </Button>
            </Show>
            <Show
              when={active() == 'account'}
              fallback={
                <Button variant="faded" onClick={() => setActive('account')}>
                  <IconUser class="h-6 w-6" />
                  <span class="whitespace-nowrap">Account</span>
                </Button>
              }>
              <Button variant="noHover">
                <IconUser class="h-6 w-6" />
                <span class="whitespace-nowrap">Account</span>
              </Button>
            </Show>
          </div>
          <div class="w-full my-8 mr-8">
            <Switch fallback={<div>No Content</div>}>
              <Match when={active() == 'dashboard'}>
                <DashboardContent />
              </Match>
              <Match when={active() == 'makeReservation'}>
                <CreateReservationContent />
              </Match>
              <Match when={active() == 'showReservations'}>
                <ShowReservationContent />
              </Match>
              <Match when={active() == 'account'}>
                <AccountContent />
              </Match>
            </Switch>
          </div>
        </main>
      </Layout>
    </>
  )
}

export default Dashboard
