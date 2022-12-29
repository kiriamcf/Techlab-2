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

const AdminMachine: Component = () => {
  const { notify } = useContext(NotificationContext)

  const [machines] = createTurboResource<Machine[]>(() => '/api/machines')
  const [laboratories] = createTurboResource<Laboratory[]>(() => '/api/laboratories')
  const [activeMachine, setActiveMachine] = createSignal<number>()
  const [machineName, setMachineName] = createSignal<string>()
  const [machineLaboratory, setMachineLaboratory] = createSignal<number>()
  const [machineDescription, setMachineDescription] = createSignal<string>()
  const [machineLevelRequired, setMachineLevelRequired] = createSignal<number>()
  const [machineActive, setMachineActive] = createSignal<boolean>()

  const closeModal = (e: Event) => {
    e.preventDefault()

    if (e.target === e.currentTarget) {
      setActiveMachine(undefined),
        setMachineName(undefined),
        setMachineDescription(undefined),
        setMachineLevelRequired(undefined),
        setMachineLaboratory(undefined),
        setMachineActive(undefined)
    }
  }

  const dataToSubmit = () => ({
    name: machineName(),
    description: machineDescription(),
    active: machineActive(),
    level_required: machineLevelRequired(),
    laboratory_id: machineLaboratory(),
  })

  const modifyMachine = async () => {
    const response = await axios.put(`/api/machines/${activeMachine()}`, dataToSubmit())

    turbo.mutate<Machine>(`/api/machines/${machineActive()}`, response.data.data)

    turbo.query('/api/machines', { fresh: true })

    setActiveMachine(undefined),
      setMachineName(undefined),
      setMachineDescription(undefined),
      setMachineLevelRequired(undefined),
      setMachineLaboratory(undefined),
      setMachineActive(undefined),
      notify('Machine modified successfully')
  }

  // createEffect(() => console.log(laboratories()?.[0].name))

  return (
    <>
      <Layout auth={true}>
        <div class="w-full mt-8">
          <Card>
            <div class="flex justify-between items-center">
              <CardTitle>Existing Machines</CardTitle>
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
                  <span>Loading Machines...</span>
                </div>
              }>
              <Show
                when={machines() != undefined && machines()?.length != 0}
                fallback={
                  <div class="flex w-full bg-green-500 rounded select-none">
                    <div class="flex items-center justify-center p-2">
                      <IconWarning class="h-6 w-6 text-black" />
                    </div>
                    <div class="px-2 flex items-center w-full rounded-r text-black font-medium">
                      There are currently no machines created
                    </div>
                  </div>
                }>
                <div class="grid grid-cols-3 gap-4 w-full">
                  <For each={machines()}>
                    {(machine, i) => (
                      <>
                        <Portal>
                          <Show when={activeMachine() === machine.id}>
                            <div
                              class="fixed inset-0 w-full h-full bg-neutral-900 bg-opacity-75 flex items-center justify-center"
                              onclick={(e) => closeModal(e)}>
                              <div class="w-96 mx-4 ">
                                <Card>
                                  <form action="">
                                    <div class="flex flex-col space-y-3 w-full">
                                      <div class="flex flex-col w-full">
                                        <span class="mb-1 inline-block">ID</span>
                                        <InputText
                                          placeholder="Machine name"
                                          value={machine.id.toString()}
                                          disabled
                                        />
                                      </div>
                                      <div class="flex flex-col w-full">
                                        <span class="mb-1 inline-block">Name</span>
                                        <InputText
                                          placeholder="Machine name"
                                          value={machineName()}
                                          onChange={(e) => setMachineName(e.currentTarget.value)}
                                        />
                                      </div>
                                      <div class="flex flex-col w-full">
                                        <span class="mb-1 inline-block">Level Required</span>
                                        <InputSelect
                                          placeholder="Machine level required"
                                          onChange={(e) =>
                                            setMachineLevelRequired(Number(e.currentTarget.value))
                                          }>
                                          <For each={['0', '1', '2']}>
                                            {(option, i) => (
                                              <Show
                                                when={Number(option) === machineLevelRequired()}
                                                fallback={
                                                  <option value={Number(option)}>{option}</option>
                                                }>
                                                <option value={Number(option)} selected>
                                                  {option}
                                                </option>
                                              </Show>
                                            )}
                                          </For>
                                        </InputSelect>
                                      </div>
                                      <div class="flex flex-col w-full">
                                        <span class="mb-1 inline-block">Laboratory</span>
                                        <InputSelect
                                          placeholder="Select laboratory"
                                          onChange={(e) =>
                                            setMachineLaboratory(Number(e.currentTarget.value))
                                          }>
                                          <For each={laboratories()}>
                                            {(option, i) => (
                                              <Show
                                                when={option.id === machineLaboratory()}
                                                fallback={
                                                  <option value={option.id}>{option.name}</option>
                                                }>
                                                <option value={option.id} selected>
                                                  {option.name}
                                                </option>
                                              </Show>
                                            )}
                                          </For>
                                        </InputSelect>
                                      </div>
                                      <div class="flex flex-col w-full">
                                        <span class="mb-1 inline-block">Description</span>
                                        <InputTextArea
                                          placeholder="Machine description..."
                                          value={machineDescription()}
                                          onChange={(e) =>
                                            setMachineDescription(e.currentTarget.value)
                                          }
                                        />
                                      </div>
                                      <Button onClick={() => modifyMachine()}>save</Button>
                                    </div>
                                  </form>
                                </Card>
                              </div>
                            </div>
                          </Show>
                        </Portal>
                        <div
                          class="bg-transparent p-4 rounded border-2 border-neutral-700 hover:border-primary-500 hover:text-primary-500 transition-colors duration-500 space-y-2"
                          onClick={() => (
                            setActiveMachine(machine.id),
                            setMachineName(machine.name),
                            setMachineDescription(machine.description),
                            setMachineLaboratory(machine.laboratory_id),
                            setMachineLevelRequired(machine.level_required),
                            setMachineActive(machine.active)
                          )}>
                          <div class="flex justify-between">
                            <span class="uppercase text-primary-500">{machine.name}</span>
                            <Show
                              when={machine.active}
                              fallback={
                                <span class="relative inline-flex rounded-full h-3 w-3 bg-neutral-700"></span>
                              }>
                              <span class="relative inline-flex rounded-full h-3 w-3 bg-primary-500">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                              </span>
                            </Show>
                          </div>
                          <div>Laboratory: {machine.laboratory_name}</div>
                          {/* <span class="line-clamp-1">{machine.description}</span> */}
                        </div>
                      </>
                    )}
                  </For>
                </div>
              </Show>
            </Suspense>
          </Card>
        </div>
      </Layout>
    </>
  )
}

export default AdminMachine
