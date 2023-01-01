import { Component } from 'solid-js'
import Layout from './components/Layout'
import DashboardLayout from './components/DashboardLayout'
import CreateReservationContent from './components/singleUse/CreateReservationContent'

const CreateReservation: Component = () => {
  return (
    <>
      <Layout auth={true}>
        {/* <main class="w-full max-w-screen-2xl mx-auto flex"> */}
        <div class="flex lg:flex-row flex-col">
          <DashboardLayout />
          <div class="w-full my-0 lg:my-6">
            <CreateReservationContent />
          </div>
        </div>
      </Layout>
    </>
  )
}

export default CreateReservation
