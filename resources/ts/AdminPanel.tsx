import { Component } from 'solid-js'
import Layout from './components/Layout'
import Card from './components/Card'
import CardTitle from './components/CardTitle'
import laboratory from '../assets/images/laboratory.jpg'
import machine from '../assets/images/machine.jpg'
import rfid from '../assets/images/rfid.jpg'
import consumption from '../assets/images/consumption.jpg'
import event from '../assets/images/event.jpg'
import user from '../assets/images/user.jpg'
import { A } from '@solidjs/router'

const AdminPanel: Component = () => {
  return (
    <>
      <Layout auth={true}>
        <div class="w-full my-6">
          <Card>
            <div class="text-center">
              <CardTitle>Admin Panel</CardTitle>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
              <A href="/adminpanel/laboratories">
                <div class="group relative w-full h-auto">
                  <img
                    src={laboratory}
                    alt="laboratory"
                    class="rounded object-cover object-center w-full h-full max-h-96"
                  />
                  <div class="uppercase text-center rounded-b font-semibold text-black absolute opacity-0 group-hover:opacity-100 duration-500 bottom-0 left-0 w-full py-4 bg-primary-500">
                    Laboratory management
                  </div>
                </div>
              </A>
              <A href="/adminpanel/machines">
                <div class="group relative w-full h-full">
                  <img
                    src={machine}
                    alt="machine"
                    class="rounded object-cover object-center w-full h-full max-h-96"
                  />
                  <div class="uppercase text-center rounded-b font-semibold text-black absolute opacity-0 group-hover:opacity-100 duration-500 bottom-0 left-0 w-full py-4 bg-primary-500">
                    Machine management
                  </div>
                </div>
              </A>
              <A href="/adminpanel/rfid">
                <div class="group relative w-full h-full">
                  <img
                    src={rfid}
                    alt="rfid"
                    class="rounded object-cover object-center w-full h-full max-h-96"
                  />
                  <div class="uppercase text-center rounded-b font-semibold text-black absolute opacity-0 group-hover:opacity-100 duration-500 bottom-0 left-0 w-full py-4 bg-primary-500">
                    Solve RFID requests
                  </div>
                </div>
              </A>
              <A href="/adminpanel/consumption">
                <div class="group relative w-full h-full">
                  <img
                    src={consumption}
                    alt="consumption"
                    class="rounded object-cover object-center w-full h-full max-h-96"
                  />
                  <div class="uppercase text-center rounded-b font-semibold text-black absolute opacity-0 group-hover:opacity-100 duration-500 bottom-0 left-0 w-full py-4 bg-primary-500">
                    Machine consumption
                  </div>
                </div>
              </A>
              <A href="/adminpanel/event">
                <div class="group relative w-full h-full">
                  <img
                    src={event}
                    alt="event"
                    class="rounded object-cover object-center w-full h-full max-h-96"
                  />
                  <div class="uppercase text-center rounded-b font-semibold text-black absolute opacity-0 group-hover:opacity-100 duration-500 bottom-0 left-0 w-full py-4 bg-primary-500">
                    Create event
                  </div>
                </div>
              </A>
              <A href="/adminpanel/user">
                <div class="group relative w-full h-full">
                  <img
                    src={user}
                    alt="user"
                    class="rounded object-cover object-center w-full h-full max-h-96"
                  />
                  <div class="uppercase text-center rounded-b font-semibold text-black absolute opacity-0 group-hover:opacity-100 duration-500 bottom-0 left-0 w-full py-4 bg-primary-500">
                    User management
                  </div>
                </div>
              </A>
            </div>
          </Card>
        </div>
      </Layout>
    </>
  )
}

export default AdminPanel
