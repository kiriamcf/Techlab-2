import { Component } from 'solid-js'
import Layout from './components/Layout'
import Card from './components/Card'
import IconMachine from './components/Icons/Machine'
import IconLaboratory from './components/Icons/Laboratory'
import IconCardShallow from './components/Icons/CardShallow'
import CardTitle from './components/CardTitle'
import Button from './components/Button'
import upc from '../assets/images/upc.png'
import laboratory from '../assets/images/laboratory.jpg'
import machine from '../assets/images/machine.jpg'
import rfid from '../assets/images/rfid.jpg'
import { A } from '@solidjs/router'

const AdminPanel: Component = () => {
  return (
    <>
      <Layout auth={true}>
        <div class="w-full mt-8">
          <Card>
            <div class="text-center">
              <CardTitle>Admin Panel</CardTitle>
            </div>
            <div class="grid grid-cols-3 gap-4 w-full">
              {/* <Button variant={'centeredBordered'}>
                  <IconLaboratory class="h-40 w-40 text-white mb-2" />
                  <span>Create / Modify Laboratories</span>
                </Button>
                <Button variant={'centeredBordered'}>
                  <IconMachine class="h-40 w-40 text-white" />
                  <span>Create / Modify Machines</span>
                </Button>
                <Button variant={'centeredBordered'}>
                  <IconCardShallow class="h-28 w-28 text-white" />
                  <span>Solve RFID requests</span>
                </Button> */}
              <A href="/">
                <div class="group relative w-full h-auto">
                  <img
                    src={laboratory}
                    alt="laboratory"
                    class="rounded object-cover object-center w-full h-full max-h-96"
                  />
                  <div class="uppercase text-center rounded-b font-semibold text-black absolute opacity-0 group-hover:opacity-100 duration-500 bottom-0 left-0 w-full py-4 bg-primary-500">
                    Create / Modify Laboratories
                  </div>
                </div>
              </A>
              <A href="/">
                <div class="group relative w-full h-full">
                  <img
                    src={machine}
                    alt="machine"
                    class="rounded object-cover object-center w-full h-full max-h-96"
                  />
                  <div class="uppercase text-center rounded-b font-semibold text-black absolute opacity-0 group-hover:opacity-100 duration-500 bottom-0 left-0 w-full py-4 bg-primary-500">
                    Create / Modify Machines
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
            </div>
          </Card>
        </div>
      </Layout>
    </>
  )
}

export default AdminPanel
