import { Component } from 'solid-js'
import Layout from './components/Layout'
import DashboardLayout from './components/DashboardLayout'
import ShowReservationContent from './components/singleUse/ShowReservationContent'

const ShowReservation: Component = () => {
  return (
    <>
      <Layout auth={true}>
        {/* <main class="w-full max-w-screen-2xl mx-auto flex"> */}
        <div class="flex">
          <DashboardLayout />
          <div class="w-full my-8">
            <ShowReservationContent />
          </div>
        </div>
      </Layout>
    </>
  )
}

export default ShowReservation
