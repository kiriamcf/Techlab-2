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
import dayjs from 'dayjs'
import { A } from '@solidjs/router'
import IconArrowLeft from './components/Icons/ArrowLeft'

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
        <div class="w-full my-6">
          <Card>
            <div class="flex justify-between items-center">
              <CardTitle>RFID Petitions</CardTitle>
              <A href="/adminpanel">
                <div class="p-2 hover:bg-primary-500 rounded group transition-colors duration-500">
                  <IconArrowLeft class="h-6 w-6 text-white group-hover:text-black transition-colors duration-500" />
                </div>
              </A>
            </div>
            <Suspense
              fallback={
                <div class="flex space-x-2 p-2 bg-primary-500 rounded text-black justify-center">
                  <IconLoading class="h-6 w-6 animate-spin text-black" />
                  <span>Loading Petitions...</span>
                </div>
              }>
              <Show
                when={petitions() != undefined && petitions()?.length != 0}
                fallback={
                  <div class="flex w-full bg-green-500 rounded select-none justify-center">
                    <div class="flex items-center justify-center p-2">
                      <IconWarning class="h-6 w-6 text-black" />
                    </div>
                    <div class="p-2 flex items-center rounded-r text-black font-medium">
                      There are currently no petitions to solve
                    </div>
                  </div>
                }>
                <div class="overflow-x-auto hidden md:block rounded">
                  <table class="w-full text-sm text-left text-gray-400">
                    <thead class="text-xs uppercase bg-zinc-700 text-gray-400">
                      <tr>
                        <th class="py-3 px-6">ID</th>
                        <th class="py-3 px-6">Name</th>
                        <th class="py-3 px-6">Surname</th>
                        <th class="py-3 px-6">Email</th>
                        <th class="py-3 px-6">Created At</th>
                        <th class="py-3 px-6">Action</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y">
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
                                        placeholder="XX XX XX XX"
                                        value={rfidCard()}
                                        onChange={(e) => setRfidCard(e.currentTarget.value)}
                                      />
                                    </div>
                                    <Button onClick={() => solvePetition()}>send</Button>
                                  </Card>
                                </div>
                              </Show>
                            </Portal>
                            <tr class="bg-zinc-800 dark:border-gray-700">
                              <td class="py-4 px-6">{petition.user_id}</td>
                              <td class="py-4 px-6">{petition.name}</td>
                              <td class="py-4 px-6">{petition.surname}</td>
                              <td class="py-4 px-6">{petition.email}</td>
                              <td class="py-4 px-6">
                                {dayjs(petition.created_at).format('DD/MM/YY')}
                              </td>
                              <td class="py-4 px-6">
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
                </div>
              </Show>
            </Suspense>
          </Card>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden p-6">
            <Suspense>
              <Show when={petitions() != undefined && petitions()?.length != 0}>
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
                                  placeholder="XX XX XX XX"
                                  value={rfidCard()}
                                  onChange={(e) => setRfidCard(e.currentTarget.value)}
                                />
                              </div>
                              <Button onClick={() => solvePetition()}>send</Button>
                            </Card>
                          </div>
                        </Show>
                      </Portal>
                      <Card grid="true">
                        <div class="flex flex-col w-full">
                          <span class="mb-1 inline-block">Name</span>
                          <InputText placeholder="Machine name" value={petition.name} disabled />
                        </div>
                        <div class="flex flex-col w-full">
                          <span class="mb-1 inline-block">Surname</span>
                          <InputText placeholder="Machine name" value={petition.surname} disabled />
                        </div>

                        <div class="flex flex-col w-full">
                          <span class="mb-1 inline-block">Email</span>
                          <InputText placeholder="Machine name" value={petition.email} disabled />
                        </div>
                        <div class="flex flex-col w-full">
                          <span class="mb-1 inline-block">Created At</span>
                          <InputText
                            placeholder="Machine name"
                            value={dayjs(petition.created_at).format('DD/MM/YY')}
                            disabled
                          />
                        </div>
                        <Button
                          onClick={() => {
                            setActiveUser(petition.user_id), setActivePetition(petition.id)
                          }}>
                          Solve
                        </Button>
                      </Card>
                    </>
                  )}
                </For>
              </Show>
            </Suspense>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default AdminRFID
