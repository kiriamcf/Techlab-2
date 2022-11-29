import { Component } from 'solid-js'
import Layout from './components/Layout'
import Card from './components/Card'
import IconMachine from './components/Icons/Machine'
import IconLaboratory from './components/Icons/Laboratory'
import IconCardShallow from './components/Icons/CardShallow'
import CardTitle from './components/CardTitle'

const AdminRFID: Component = () => {
  return (
    <>
      <Layout auth={true}>
        <main class="w-full max-w-5xl mx-auto flex">
          <div class="w-full m-8">
            <Card>
              <CardTitle>RFID Requests</CardTitle>
            </Card>
          </div>
        </main>
      </Layout>
    </>
  )
}

export default AdminRFID
