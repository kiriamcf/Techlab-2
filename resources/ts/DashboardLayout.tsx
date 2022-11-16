import { Component } from 'solid-js'
import Button from './components/Button'
import IconDashboard from './components/Icons/Dashboard'
import IconCreate from './components/Icons/Create'
import IconSearch from './components/Icons/Search'
import IconUser from './components/Icons/User'
import { A, useLocation } from '@solidjs/router'

const DashboardLayout: Component = () => {
  const location = useLocation()

  return (
    <>
      <div class="p-8 flex flex-col space-y-2">
        <A href="/dashboard">
          <Button variant={location.pathname == '/dashboard' ? 'noHover' : 'faded'}>
            <IconDashboard class="h-6 w-6" />
            <span class="whitespace-nowrap">Dashboard</span>
          </Button>
        </A>
        <A href="/createReservation">
          <Button variant={location.pathname == '/createReservation' ? 'noHover' : 'faded'}>
            <IconCreate class="h-6 w-6" />
            <span class="whitespace-nowrap">Create Reservation</span>
          </Button>
        </A>
        <A href="/showReservation">
          <Button variant={location.pathname == '/showReservation' ? 'noHover' : 'faded'}>
            <IconSearch class="h-6 w-6" />
            <span class="whitespace-nowrap">Show Reservations</span>
          </Button>
        </A>
        <A href="/account">
          <Button variant={location.pathname == '/account' ? 'noHover' : 'faded'}>
            <IconUser class="h-6 w-6" />
            <span class="whitespace-nowrap">Account</span>
          </Button>
        </A>
      </div>
    </>
  )
}

export default DashboardLayout
