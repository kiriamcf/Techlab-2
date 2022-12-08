import { Component } from 'solid-js'
import Layout from './components/Layout'
import DashboardLayout from './components/DashboardLayout'
import ShowReservationContent from './components/singleUse/ShowReservationContent'

const ShowReservation: Component = () => {
  return (
    <>
      <Layout auth={true}>
        {/* <main class="w-full max-w-screen-2xl mx-auto flex"> */}
        <main class="w-full max-w-5xl mx-auto flex">
          <DashboardLayout />
          <div class="w-full my-8">
            <ShowReservationContent />
          </div>
        </main>
      </Layout>
    </>
  )
}

export default ShowReservation
