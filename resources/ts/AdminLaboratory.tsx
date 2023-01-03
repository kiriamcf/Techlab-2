import { Component, createEffect, createSignal, For, Show, Suspense, useContext } from 'solid-js'
import Layout from './components/Layout'
import Card from './components/Card'
import CardTitle from './components/CardTitle'
import IconLoading from './components/Icons/Loading'
import IconArrowLeft from './components/Icons/ArrowLeft'
import { A } from '@solidjs/router'
import { createTurboResource } from 'turbo-solid'
import Machine from './contracts/machine'
import IconWarning from './components/Icons/Warning'
import { Portal } from 'solid-js/web'
import Button from './components/Button'
import InputText from './components/InputText'
import InputSelect from './components/InputSelect'
import InputTextArea from './components/InputTextArea'
import Laboratory from './contracts/laboratory'
import { axios, turbo } from './Instances'
import { NotificationContext } from './components/singleUse/Notifications'

const AdminLaboratory: Component = () => {
  const { notify } = useContext(NotificationContext)

  const [laboratories] = createTurboResource<Laboratory[]>(() => '/api/laboratories')
  const [activeLaboratory, setActiveLaboratory] = createSignal<number>()
  const [modifyName, setModifyName] = createSignal<string>()
  const [modifyRoom, setModifyRoom] = createSignal<string>()
  const [createName, setCreateName] = createSignal<string>('')
  const [createRoom, setCreateRoom] = createSignal<string>('')

  const closeModal = (e: Event) => {
    e.preventDefault()

    if (e.target === e.currentTarget) {
      setActiveLaboratory(undefined), setModifyName(undefined), setModifyRoom(undefined)
    }
  }

  const dataToSubmitModify = () => ({
    name: modifyName(),
    room_number: modifyRoom(),
  })

  const modifyLaboratory = async () => {
    const response = await axios.put(
      `/api/laboratories/${activeLaboratory()}`,
      dataToSubmitModify()
    )

    turbo.mutate<Machine>(`/api/laboratories/${activeLaboratory()}`, response.data.data)

    turbo.query('/api/laboratories', { fresh: true })

    setActiveLaboratory(undefined),
      setModifyName(undefined),
      setModifyRoom(undefined),
      notify('Laboratory modified successfully')
  }

  const dataToSubmitCreate = () => ({
    name: createName(),
    room_number: createRoom(),
  })

  const createLaboratory = async () => {
    if (createName() === '' || createRoom() === '') {
      notify('You must fill in all fields!', 'error')
      return
    }

    await axios.post('/api/laboratories', dataToSubmitCreate())

    turbo.query('/api/laboratories', { fresh: true })

    setCreateName(''), setCreateRoom(''), notify('Laboratory created successfully!')
  }

  return (
    <>
      <Layout auth={true}>
        <div class="w-full my-6">
          <Card>
            <div class="flex justify-between items-center">
              <CardTitle>Existing Laboratories</CardTitle>
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
                  <span>Loading Laboratories...</span>
                </div>
              }>
              <Show
                when={laboratories() != undefined && laboratories()?.length != 0}
                fallback={
                  <div class="flex w-full bg-green-500 rounded select-none">
                    <div class="flex items-center justify-center p-2">
                      <IconWarning class="h-6 w-6 text-black" />
                    </div>
                    <div class="px-2 flex items-center w-full rounded-r text-black font-medium">
                      There are currently no laboratories created
                    </div>
                  </div>
                }>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                  <For each={laboratories()}>
                    {(laboratory, i) => (
                      <>
                        <Portal>
                          <Show when={activeLaboratory() === laboratory.id}>
                            <div
                              class="fixed inset-0 w-full h-full bg-neutral-900 bg-opacity-75 flex items-center justify-center"
                              onclick={(e) => closeModal(e)}>
                              <div class="w-96 mx-4 overflow-y-auto">
                                <Card>
                                  <form action="">
                                    <div class="flex flex-col space-y-3 w-full">
                                      <div class="flex flex-col w-full">
                                        <span class="mb-1 inline-block">ID</span>
                                        <InputText
                                          placeholder="Machine name"
                                          value={laboratory.id.toString()}
                                          disabled
                                        />
                                      </div>
                                      <div class="flex flex-col w-full">
                                        <span class="mb-1 inline-block">Name</span>
                                        <InputText
                                          placeholder="Laboratory name"
                                          value={modifyName()}
                                          onChange={(e) => setModifyName(e.currentTarget.value)}
                                        />
                                      </div>
                                      <div class="flex flex-col w-full">
                                        <span class="mb-1 inline-block">Room Number</span>
                                        <InputText
                                          placeholder="Laboratory room number"
                                          value={modifyRoom()}
                                          onChange={(e) => setModifyRoom(e.currentTarget.value)}
                                        />
                                      </div>
                                      <Button onClick={() => modifyLaboratory()}>save</Button>
                                    </div>
                                  </form>
                                </Card>
                              </div>
                            </div>
                          </Show>
                        </Portal>
                        <div
                          class="bg-transparent p-4 rounded border-2 border-neutral-700 hover:border-primary-500 hover:text-primary-500 transition-colors duration-500 space-y-2 cursor-pointer"
                          onClick={() => (
                            setActiveLaboratory(laboratory.id),
                            setModifyName(laboratory.name),
                            setModifyRoom(laboratory.room_number)
                          )}>
                          <span class="uppercase text-primary-500">{laboratory.name}</span>
                          <div>Laboratory: {laboratory.room_number}</div>
                        </div>
                      </>
                    )}
                  </For>
                </div>
              </Show>
            </Suspense>
            <CardTitle type="margined">Create a new laboratory</CardTitle>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div class="flex flex-col w-full">
                <span class="mb-1 inline-block">Name</span>
                <InputText
                  placeholder="Laboratory name"
                  value={createName()}
                  onChange={(e) => setCreateName(e.currentTarget.value)}
                />
              </div>
              <div class="flex flex-col w-full">
                <span class="mb-1 inline-block">Room Number</span>
                <InputText
                  placeholder="Laboratory room number"
                  value={createRoom()}
                  onChange={(e) => setCreateRoom(e.currentTarget.value)}
                />
              </div>
            </div>
            <Button onClick={() => createLaboratory()}>create</Button>
          </Card>
        </div>
      </Layout>
    </>
  )
}

export default AdminLaboratory
