import { Component, createMemo, createSignal, For, Show, Suspense } from 'solid-js'
import Layout from './components/Layout'
import Card from './components/Card'
import CardTitle from './components/CardTitle'
import { createTurboResource } from 'turbo-solid'
import IconLoading from './components/Icons/Loading'
import RfidPetition from './contracts/rfidPetition'
import Button from './components/Button'
import { Portal } from 'solid-js/web'
import InputText from './components/InputText'
import User from './contracts/user'
import { axios, turbo } from './Instances'
import IconWarning from './components/Icons/Warning'

const AdminRFID: Component = () => {
  const [petitions] = createTurboResource<RfidPetition[]>(() => '/api/rfid_petitions')
  const [rfidCard, setRfidCard] = createSignal<string>('')
  const [activeUser, setActiveUser] = createSignal<number>()
  const [activePetition, setActivePetition] = createSignal<number>()

  const closeModal = (e: Event) => {
    e.preventDefault()
    setRfidCard('')
    if (e.target === e.currentTarget) {
      setActiveUser(undefined)
      setActivePetition(undefined)
    }
  }

  const solvePetition = async () => {
    // update user
    // const responseUser = await axios.put(`/api/user/${activeUser()}`, { rfid_card: rfidCard() })
    // delete petition
    await axios.put(`/api/rfid_petitions/${activePetition()}/solve`, {
      rfid_card: rfidCard().toUpperCase(),
    })
    turbo.mutate<RfidPetition[]>(
      '/api/rfid_petitions',
      (old) => old?.filter((petition) => petition.id != activePetition()) ?? []
    )
    turbo.forget([`/api/rfid_petitions/${activePetition()}`, `/api/users/${activeUser()}`])
    // turbo.mutate<User>(`/api/user/${activeUser()}`, (oldUser) => ({...oldUser!, rfid_card: rfidCard()}))
    // close modal
    setRfidCard('')
    setActiveUser(undefined)
    setActivePetition(undefined)
  }

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
                <Show
                  when={petitions() != undefined && petitions()?.length != 0}
                  fallback={
                    <div class="flex w-full bg-green-500 rounded select-none">
                      <div class="flex items-center justify-center p-2">
                        <IconWarning class="h-6 w-6 text-black" />
                      </div>
                      <div class="px-2 flex items-center w-full rounded-r text-black font-medium">
                        There are currently no petitions to solve
                      </div>
                    </div>
                  }>
                  <table class="table-auto border-separate border-spacing-y-2">
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
                          <>
                            <Portal>
                              <Show when={activeUser() === petition.user_id}>
                                <div
                                  class="fixed inset-0 w-full h-full bg-neutral-900 bg-opacity-75 flex items-center justify-center"
                                  onclick={(e) => closeModal(e)}>
                                  <Card>
                                    <div class="flex items-center space-x-2">
                                      <span>Currently editing: </span>
                                      <span class="text-primary-500">{petition.email}</span>
                                    </div>
                                    <div class="flex items-center space-x-2">
                                      <span class="whitespace-nowrap">New RFID Card:</span>
                                      <InputText
                                        placeholder="RFID Code"
                                        value={rfidCard()}
                                        onChange={(e) => setRfidCard(e.currentTarget.value)}
                                      />
                                    </div>
                                    <Button onClick={() => solvePetition()}>send</Button>
                                  </Card>
                                </div>
                              </Show>
                            </Portal>
                            <tr>
                              <td>{petition.user_id}</td>
                              <td>{petition.name}</td>
                              <td>{petition.surname}</td>
                              <td>{petition.email}</td>
                              <td>{petition.created_at}</td>
                              <td>
                                <Button
                                  onClick={() => {
                                    setActiveUser(petition.user_id), setActivePetition(petition.id)
                                  }}>
                                  Solve
                                </Button>
                              </td>
                            </tr>
                          </>
                        )}
                      </For>
                    </tbody>
                  </table>
                </Show>
              </Suspense>
            </Card>
          </div>
        </main>
      </Layout>
    </>
  )
}

export default AdminRFID
