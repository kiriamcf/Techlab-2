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
  const [modifyName, setModifyName] = createSignal<string>('')
  const [modifyLaboratory, setModifyLaboratory] = createSignal<number>()
  const [modifyDescription, setModifyDescription] = createSignal<string>('')
  const [modifyLevelRequired, setModifyLevelRequired] = createSignal<number>()
  const [modifyActive, setModifyActive] = createSignal<boolean>()
  const [modifyUrl, setModifyUrl] = createSignal<string>('')
  const [modifyOriginalUrl, setModifyOriginalUrl] = createSignal<string>('')
  const [createName, setCreateName] = createSignal<string>('')
  const [createLaboratory, setCreateLaboratory] = createSignal<number>()
  const [createDescription, setCreateDescription] = createSignal<string>('')
  const [createLevelRequired, setCreateLevelRequired] = createSignal<number>()
  const [createUrl, setCreateUrl] = createSignal<string>('')

  const closeModal = (e: Event) => {
    e.preventDefault()

    if (e.target === e.currentTarget) {
      setActiveMachine(undefined),
        setModifyName(''),
        setModifyDescription(''),
        setModifyLevelRequired(undefined),
        setModifyLaboratory(undefined),
        setModifyActive(undefined),
        setModifyUrl('')
      setModifyOriginalUrl('')
    }
  }

  const dataToSubmitModify = () => ({
    name: modifyName(),
    description: modifyDescription(),
    active: modifyActive(),
    level_required: modifyLevelRequired(),
    laboratory_id: modifyLaboratory(),
    url: modifyUrl(),
  })

  const modifyMachine = async () => {
    if (
      modifyName() === '' ||
      modifyDescription() === '' ||
      modifyLaboratory() === undefined ||
      modifyLevelRequired() === undefined
    ) {
      notify('You must fill in all fields!', 'error')
      return
    }

    if (modifyDescription().length > 255) {
      notify('You must not exceed character limits!', 'error')
      return
    }

    let response

    if (modifyOriginalUrl() === '' && modifyUrl() === '') {
      response = await axios.put(`/api/machines/${activeMachine()}`, {
        name: modifyName(),
        description: modifyDescription(),
        active: modifyActive(),
        level_required: modifyLevelRequired(),
        laboratory_id: modifyLaboratory(),
      })
    } else {
      response = await axios.put(`/api/machines/${activeMachine()}`, dataToSubmitModify())
    }

    turbo.mutate<Machine>(`/api/machines/${activeMachine()}`, response.data.data)

    turbo.query('/api/machines', { fresh: true })

    setActiveMachine(undefined),
      setModifyName(''),
      setModifyDescription(''),
      setModifyLevelRequired(undefined),
      setModifyLaboratory(undefined),
      setModifyActive(undefined),
      setModifyUrl(''),
      setModifyOriginalUrl('')
    notify('Machine modified successfully')
  }

  const dataToSubmitCreate = () => ({
    name: createName(),
    description: createDescription(),
    active: false,
    level_required: createLevelRequired(),
    url: createUrl(),
  })

  const createMachine = async () => {
    if (
      createName() === '' ||
      createDescription() === '' ||
      createLaboratory() === undefined ||
      createLevelRequired() === undefined
    ) {
      notify('You must fill in all fields!', 'error')
      return
    }

    if (createDescription().length > 255) {
      notify('You must not exceed character limits!', 'error')
      return
    }

    if (createUrl() === '') {
      await axios.post(`/api/laboratories/${createLaboratory()}/machines`, {
        name: createName(),
        description: createDescription(),
        active: false,
        level_required: createLevelRequired(),
      })
    } else {
      await axios.post(`/api/laboratories/${createLaboratory()}/machines`, dataToSubmitCreate())
    }

    turbo.query('/api/machines', { fresh: true })

    setCreateName(''),
      setCreateDescription(''),
      setCreateLevelRequired(undefined),
      setCreateLaboratory(undefined),
      setCreateUrl(''),
      notify('Machine created successfully!')
  }

  const deleteMachine = async () => {
    await axios.delete(`/api/machines/${activeMachine()}`)

    turbo.query('/api/machines', { fresh: true })

    setActiveMachine(undefined)
    notify('Machine deleted successfully!')
  }

  const activateMachine = async () => {
    await axios.put(`/api/machines/${activeMachine()}`, { active: true })

    turbo.mutate<Machine>(`/api/machines/${activeMachine()}`, (old) => ({
      ...old!,
      active: true,
    }))

    turbo.query('/api/machines', { fresh: true })

    notify('Machine activated successfully')
  }

  const deactivateMachine = async () => {
    await axios.put(`/api/machines/${activeMachine()}`, { active: false })

    turbo.mutate<Machine>(`/api/machines/${activeMachine()}`, (old) => ({
      ...old!,
      active: false,
    }))

    turbo.query('/api/machines', { fresh: true })

    notify('Machine deactivated successfully')
  }

  return (
    <>
      <Layout auth={true}>
        <div class="w-full my-6">
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
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                  <For each={machines()}>
                    {(machine, i) => (
                      <>
                        <Portal>
                          <Show when={activeMachine() === machine.id}>
                            <div
                              class="fixed inset-0 w-full h-full bg-neutral-900 bg-opacity-75 flex items-center justify-center"
                              onclick={(e) => closeModal(e)}>
                              <div class="w-96 max-h-96 max-w-96 mx-4 overflow-y-scroll">
                                <Card>
                                  <form action="">
                                    <div class="flex flex-col space-y-3 w-full">
                                      <div class="flex flex-col w-full">
                                        <span class="mb-1 inline-block">ID</span>
                                        <InputText
                                          placeholder="Machine name"
                                          style="bgDisabled"
                                          value={machine.id.toString()}
                                          disabled
                                        />
                                      </div>
                                      <div class="flex flex-col w-full">
                                        <span class="mb-1 inline-block">Name</span>
                                        <InputText
                                          placeholder="Machine name"
                                          value={modifyName()}
                                          onChange={(e) => setModifyName(e.currentTarget.value)}
                                        />
                                      </div>
                                      <div class="flex flex-col w-full">
                                        <span class="mb-1 inline-block">Level Required</span>
                                        <InputSelect
                                          placeholder="Machine level required"
                                          onChange={(e) =>
                                            setModifyLevelRequired(Number(e.currentTarget.value))
                                          }>
                                          <For each={['0', '1', '2']}>
                                            {(option, i) => (
                                              <Show
                                                when={Number(option) === modifyLevelRequired()}
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
                                            setModifyLaboratory(Number(e.currentTarget.value))
                                          }>
                                          <For each={laboratories()}>
                                            {(option, i) => (
                                              <Show
                                                when={option.id === modifyLaboratory()}
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
                                        <div class="flex space-x-2 mb-1">
                                          <span class="inline-block">Description </span>
                                          <Show
                                            when={modifyDescription().length > 255}
                                            fallback={
                                              <span class="inline-block">
                                                ({modifyDescription()?.length}/255)
                                              </span>
                                            }>
                                            <span class="inline-block text-red-500">
                                              ({modifyDescription()?.length}/255)
                                            </span>
                                          </Show>
                                        </div>
                                        <InputTextArea
                                          placeholder="Machine description..."
                                          value={modifyDescription()}
                                          rows={4}
                                          onChange={(e) =>
                                            setModifyDescription(e.currentTarget.value)
                                          }
                                        />
                                      </div>
                                      <div class="flex flex-col w-full">
                                        <span class="mb-1 inline-block">Url (optional)</span>
                                        <InputText
                                          placeholder="Machine url"
                                          value={modifyUrl()}
                                          onChange={(e) => setModifyUrl(e.currentTarget.value)}
                                        />
                                      </div>
                                      <Show
                                        when={machine.active}
                                        fallback={
                                          <Button
                                            onClick={() => {
                                              activateMachine()
                                            }}>
                                            Activate
                                          </Button>
                                        }>
                                        <Button
                                          onClick={() => {
                                            deactivateMachine()
                                          }}>
                                          Deactivate
                                        </Button>
                                      </Show>
                                      <Button onClick={() => modifyMachine()}>save</Button>
                                      <Button
                                        variant="bgRed"
                                        onClick={() => {
                                          deleteMachine()
                                        }}>
                                        Delete
                                      </Button>
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
                            setActiveMachine(machine.id),
                            setModifyName(machine.name),
                            setModifyDescription(machine.description),
                            setModifyLaboratory(machine.laboratory_id),
                            setModifyLevelRequired(machine.level_required),
                            setModifyUrl(machine.url),
                            setModifyOriginalUrl(machine.url),
                            setModifyActive(machine.active)
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
                        </div>
                      </>
                    )}
                  </For>
                </div>
              </Show>
            </Suspense>
            <CardTitle type="margined">Create a new machine</CardTitle>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div class="flex flex-col w-full">
                <span class="mb-1 inline-block">Name</span>
                <InputText
                  placeholder="Machine name"
                  value={createName()}
                  onChange={(e) => setCreateName(e.currentTarget.value)}
                />
              </div>
              <div class="flex flex-col w-full">
                <span class="mb-1 inline-block">Level Required</span>
                <InputSelect
                  placeholder="Machine level required"
                  onChange={(e) => setCreateLevelRequired(Number(e.currentTarget.value))}>
                  <option value="" disabled selected>
                    Select a level
                  </option>
                  <For each={['0', '1', '2']}>
                    {(option, i) => (
                      <Show
                        when={Number(option) === createLevelRequired()}
                        fallback={<option value={Number(option)}>{option}</option>}>
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
                  onChange={(e) => setCreateLaboratory(Number(e.currentTarget.value))}>
                  <option value="" disabled selected>
                    Select a laboratory
                  </option>
                  <For each={laboratories()}>
                    {(option, i) => (
                      <Show
                        when={option.id === createLaboratory()}
                        fallback={<option value={option.id}>{option.name}</option>}>
                        <option value={option.id} selected>
                          {option.name}
                        </option>
                      </Show>
                    )}
                  </For>
                </InputSelect>
              </div>
              <div class="flex flex-col w-full">
                <span class="mb-1 inline-block">Url (optional)</span>
                <InputText
                  placeholder="Machine url"
                  value={createUrl()}
                  onChange={(e) => setCreateUrl(e.currentTarget.value)}
                />
              </div>
            </div>
            <div class="flex flex-col w-full">
              <div class="flex space-x-2 mb-1">
                <span class="inline-block">Description </span>
                <Show
                  when={createDescription().length > 255}
                  fallback={<span class="inline-block">({createDescription().length}/255)</span>}>
                  <span class="inline-block text-red-500">({createDescription().length}/255)</span>
                </Show>
              </div>
              <InputTextArea
                placeholder="Machine description..."
                value={createDescription()}
                rows={2}
                onChange={(e) => setCreateDescription(e.currentTarget.value)}
              />
            </div>
            <Button onClick={() => createMachine()}>create</Button>
          </Card>
        </div>
      </Layout>
    </>
  )
}

export default AdminMachine
