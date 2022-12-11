import { Component } from 'solid-js'
import Layout from './components/Layout'
import DashboardLayout from './components/DashboardLayout'
import DashboardContent from './components/singleUse/DashboardContent'

const Dashboard: Component = () => {
  return (
    <>
      <Layout auth={true}>
        <div class="flex">
          <DashboardLayout />
          <div class="w-full my-8">
            <DashboardContent />
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Dashboard
