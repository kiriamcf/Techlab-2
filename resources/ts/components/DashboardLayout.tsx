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

  return (
    <>
      <div class="p-6 pt-4 flex flex-row space-y-0 space-x-2 lg:space-x-0 flex-wrap justify-center lg:pt-6 lg:space-y-2 lg:justify-start lg:flex-col lg:pr-8 lg:pl-0">
        <div class="pt-2 lg:pt-0">
          <A href="/dashboard">
            <Button variant={location.pathname == '/dashboard' ? 'noHover' : 'faded'}>
              <IconDashboard class="h-6 w-6" />
              <span class="whitespace-nowrap">Dashboard</span>
            </Button>
          </A>
        </div>
        <div class="pt-2 lg:pt-0">
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
        </div>
        <div class="pt-2 lg:pt-0">
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
        </div>
        <div class="pt-2 lg:pt-0">
          <A href="/account">
            <Button variant={location.pathname == '/account' ? 'noHover' : 'faded'}>
              <IconUser class="h-6 w-6" />
              <span class="whitespace-nowrap">Account</span>
            </Button>
          </A>
        </div>
        <div class="pt-2 lg:pt-0">
          <Show when={user()?.()?.admin}>
            <A href="/adminpanel">
              <Button variant={location.pathname == '/adminpanel' ? 'noHover' : 'faded'}>
                <IconAdmin class="h-6 w-6" />
                <span class="whitespace-nowrap">Admin panel</span>
              </Button>
            </A>
          </Show>
        </div>
      </div>
    </>
  )
}

export default DashboardLayout
