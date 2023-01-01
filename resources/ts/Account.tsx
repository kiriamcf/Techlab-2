import { Component } from 'solid-js'
import Layout from './components/Layout'
import DashboardLayout from './components/DashboardLayout'
import AccountContent from './components/singleUse/AccountContent'

const Account: Component = () => {
  return (
    <>
      <Layout auth={true}>
        {/* <main class="w-full max-w-screen-2xl mx-auto flex"> */}
        <main class="flex lg:flex-row flex-col">
          <DashboardLayout />
          <div class="w-full my-0 lg:my-6">
            <AccountContent />
          </div>
        </main>
      </Layout>
    </>
  )
}

export default Account
