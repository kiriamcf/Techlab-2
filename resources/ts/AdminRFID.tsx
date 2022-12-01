import { Component, createMemo, For, Show, Suspense } from 'solid-js'
import Layout from './components/Layout'
import Card from './components/Card'
import CardTitle from './components/CardTitle'
import { createTurboResource } from 'turbo-solid'
import IconLoading from './components/Icons/Loading'
import RfidPetition from './contracts/rfidPetition'
import Button from './components/Button'

const AdminRFID: Component = () => {
  const [petitions] = createTurboResource<RfidPetition[]>(() => '/api/rfid_petitions')

  createMemo(() => {
    console.log(petitions())
  })

  return (
    <>
      <Layout auth={true}>
        <main class="w-full max-w-5xl mx-auto flex">
          <div class="w-full m-8">
            <Card>
              <CardTitle>RFID Requests</CardTitle>
              <Suspense
                fallback={
                  <div class="flex space-x-2 p-2 bg-primary-500 rounded text-black">
                    <IconLoading class="h-6 w-6 animate-spin text-white" />
                    <span>Loading Petitions...</span>
                  </div>
                }>
                <table class="table-auto">
                  <thead>
                    <tr>
                      <th class="text-left">ID</th>
                      <th class="text-left">Name</th>
                      <th class="text-left">Surname</th>
                      <th class="text-left">Email</th>
                      <th class="text-left">Created At</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <For each={petitions()}>
                      {(petition, i) => (
                        <tr>
                          <td>{petition.id}</td>
                          <td>{petition.name}</td>
                          <td>{petition.surname}</td>
                          <td>{petition.email}</td>
                          <td>{petition.created_at}</td>
                          <td>
                            <Button>Solve</Button>
                          </td>
                        </tr>
                      )}
                    </For>
                  </tbody>
                </table>
              </Suspense>
            </Card>
          </div>
        </main>
      </Layout>
    </>
  )
}

export default AdminRFID
