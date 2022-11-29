import { Component, Show } from 'solid-js'
import Button from './Button'
import IconDashboard from './Icons/Dashboard'
import IconCreate from './Icons/Create'
import IconSearch from './Icons/Search'
import IconUser from './Icons/User'
import IconAdmin from './Icons/Admin'
import { A, useLocation } from '@solidjs/router'
import { user } from '../signals/user'

const DashboardLayout: Component = () => {
  const location = useLocation()

  const test = () => {
    console.log(user()?.()?.rfid_card)
    console.log(user()?.()?.rfid_card == '00 00 00 00')
    return user()?.()?.rfid_card == '00 00 00 00'
  }

  return (
    <>
      <div class="pt-8 pr-8 pb-8 flex flex-col space-y-2">
        <A href="/dashboard">
          <Button variant={location.pathname == '/dashboard' ? 'noHover' : 'faded'}>
            <IconDashboard class="h-6 w-6" />
            <span class="whitespace-nowrap">Dashboard</span>
          </Button>
        </A>
        <Show
          when={user()?.()?.rfid_card == '00 00 00 00'}
          fallback={
            <A href="/createReservation">
              <Button variant={location.pathname == '/createReservation' ? 'noHover' : 'faded'}>
                <IconCreate class="h-6 w-6" />
                <span class="whitespace-nowrap">Create Reservation</span>
              </Button>
            </A>
          }>
          <Button variant={'disabled'} disabled={true}>
            <IconCreate class="h-6 w-6" />
            <span class="whitespace-nowrap">Create Reservation</span>
          </Button>
        </Show>
        <Show
          when={user()?.()?.rfid_card == '00 00 00 00'}
          fallback={
            <A href="/showReservation">
              <Button variant={location.pathname == '/showReservation' ? 'noHover' : 'faded'}>
                <IconSearch class="h-6 w-6" />
                <span class="whitespace-nowrap">Show Reservations</span>
              </Button>
            </A>
          }>
          <Button variant={'disabled'} disabled={true}>
            <IconSearch class="h-6 w-6" />
            <span class="whitespace-nowrap">Show Reservations</span>
          </Button>
        </Show>
        <A href="/account">
          <Button variant={location.pathname == '/account' ? 'noHover' : 'faded'}>
            <IconUser class="h-6 w-6" />
            <span class="whitespace-nowrap">Account</span>
          </Button>
        </A>
        <Show when={user()?.()?.admin}>
          <A href="/adminpanel">
            <Button variant={location.pathname == '/adminpanel' ? 'noHover' : 'faded'}>
              <IconAdmin class="h-6 w-6" />
              <span class="whitespace-nowrap">Admin panel</span>
            </Button>
          </A>
        </Show>
      </div>
    </>
  )
}

export default DashboardLayout
