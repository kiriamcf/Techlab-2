import { Component } from 'solid-js'
import Layout from './Layout'
import DashboardLayout from './DashboardLayout'
import ShowReservationContent from './components/ShowReservationContent'

const ShowReservation: Component = () => {
  return (
    <>
      <Layout auth={true}>
        <main class="w-full max-w-screen-2xl mx-auto flex">
          <DashboardLayout />
          <div class="w-full my-8 mr-8">
            <ShowReservationContent />
          </div>
        </main>
      </Layout>
    </>
  )
}

export default ShowReservation
