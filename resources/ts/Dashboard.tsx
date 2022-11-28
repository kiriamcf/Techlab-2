import { Component } from 'solid-js'
import Layout from './Layout'
import DashboardLayout from './DashboardLayout'
import DashboardContent from './components/DashboardContent'

const Dashboard: Component = () => {
  return (
    <>
      <Layout auth={true}>
        {/* <main class="w-full max-w-screen-2xl mx-auto flex"> */}
        <main class="w-full max-w-5xl mx-auto flex">
          <DashboardLayout />
          <div class="w-full my-8">
            <DashboardContent />
          </div>
        </main>
      </Layout>
    </>
  )
}

export default Dashboard
